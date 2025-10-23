import { Test, TestingModule } from '@nestjs/testing';
import { IndraHoursUseCase } from './indra-hours.use-case';
import { IndraEntity } from '@src/domain/entities/indra.entity';
import { IIndraInterface } from '@src/domain/interfaces/indra';
import { VISUAL_CROSSING_API, WEATHER_API } from '@src/shared/constants';

describe('IndraHoursUseCase', () => {
  let sut: IndraHoursUseCase;
  let mockWeatherApi: { execute: jest.Mock };
  let mockVisualCrossingApi: { execute: jest.Mock };

  const now = new Date();
  const todayTimestamp = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const tomorrowTimestamp = todayTimestamp + 24 * 60 * 60 * 1000;

  const mockForecasts: IndraEntity[] = [
    IndraEntity.build({
      conditions: 'Clear',
      temperature: 20,
      feelsLike: 20,
      description: 'Dia claro',
      humidity: 50,
      date: '2025-10-25 00:00:00',
      timestamp: todayTimestamp + 2 * 60 * 60 * 1000,
    }),
    IndraEntity.build({
      conditions: 'Cloudy',
      temperature: 18,
      feelsLike: 18,
      description: 'Nublado',
      humidity: 60,
      date: '2025-10-25 03:00:00',
      timestamp: todayTimestamp + 3 * 60 * 60 * 1000,
    }),
    IndraEntity.build({
      conditions: 'Rain',
      temperature: 15,
      feelsLike: 15,
      description: 'Chuva',
      humidity: 90,
      date: '2025-10-24 23:00:00',
      timestamp: todayTimestamp - 1 * 60 * 60 * 1000,
    }),
    IndraEntity.build({
      conditions: 'Fog',
      temperature: 12,
      feelsLike: 12,
      description: 'Nevoeiro',
      humidity: 95,
      date: '2025-10-26 01:00:00',
      timestamp: tomorrowTimestamp + 1 * 60 * 60 * 1000,
    }),
  ];

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2025-10-24T12:00:00Z'));
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IndraHoursUseCase,
        { provide: WEATHER_API, useValue: { execute: jest.fn() } },
        { provide: VISUAL_CROSSING_API, useValue: { execute: jest.fn() } },
      ],
    }).compile();

    sut = module.get<IndraHoursUseCase>(IndraHoursUseCase);
    mockWeatherApi = module.get<{ execute: jest.Mock }>(WEATHER_API);
    mockVisualCrossingApi = module.get<{ execute: jest.Mock }>(VISUAL_CROSSING_API);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should filter forecasts between initialDate and finalDate', async () => {
    mockWeatherApi.execute.mockResolvedValue([]);
    mockVisualCrossingApi.execute.mockResolvedValue(mockForecasts);

    const params: IIndraInterface.Params = {
      initialDate: new Date(todayTimestamp),
      finalDate: new Date(todayTimestamp + 4 * 60 * 60 * 1000),
      setFinalDate: jest.fn(),
    };

    const result = await sut.execute(params);

    expect(result).toHaveLength(2);
    expect(result.map((f) => f.conditions)).toEqual(['Clear', 'Cloudy']);
    expect(params.setFinalDate).toHaveBeenCalled();
  });

  it('should return all forecasts if no dates provided', async () => {
    mockWeatherApi.execute.mockResolvedValue([]);
    mockVisualCrossingApi.execute.mockResolvedValue(mockForecasts);

    const result = await sut.execute({ setFinalDate: jest.fn() } as any);

    expect(result).toHaveLength(4);
  });
});
