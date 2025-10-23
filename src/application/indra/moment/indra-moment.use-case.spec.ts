import { Test, TestingModule } from '@nestjs/testing';
import { IndraMomentUseCase } from './indra-moment.use-case';
import { IndraEntity } from '@src/domain/entities/indra.entity';
import { VISUAL_CROSSING_API, WEATHER_API } from '@src/shared/constants';

describe('IndraMomentUseCase', () => {
  let sut: IndraMomentUseCase;
  let mockWeatherApi: { execute: jest.Mock };
  let mockVisualCrossingApi: { execute: jest.Mock };

  const baseTimestamp = new Date(2025, 9, 25).getTime();
  const mockForecasts: IndraEntity[] = [
    IndraEntity.build({
      conditions: 'Clear',
      temperature: 20,
      feelsLike: 20,
      description: 'Dia claro',
      humidity: 50,
      date: '2025-10-25 00:00:00',
      timestamp: baseTimestamp,
    }),
    IndraEntity.build({
      conditions: 'Cloudy',
      temperature: 18,
      feelsLike: 18,
      description: 'Nublado',
      humidity: 60,
      date: '2025-10-25 03:00:00',
      timestamp: baseTimestamp + 3 * 60 * 60 * 1000,
    }),
    IndraEntity.build({
      conditions: 'Rain',
      temperature: 15,
      feelsLike: 15,
      description: 'Chuva',
      humidity: 90,
      date: '2025-10-25 06:00:00',
      timestamp: baseTimestamp + 6 * 60 * 60 * 1000,
    }),
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IndraMomentUseCase,
        { provide: WEATHER_API, useValue: { execute: jest.fn() } },
        { provide: VISUAL_CROSSING_API, useValue: { execute: jest.fn() } },
      ],
    }).compile();

    sut = module.get<IndraMomentUseCase>(IndraMomentUseCase);
    mockWeatherApi = module.get<{ execute: jest.Mock }>(WEATHER_API);
    mockVisualCrossingApi = module.get<{ execute: jest.Mock }>(VISUAL_CROSSING_API);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should return the closest forecast to the given timestamp', async () => {
    mockWeatherApi.execute.mockResolvedValue(null);
    mockVisualCrossingApi.execute.mockResolvedValue(mockForecasts);

    const targetDate = new Date(baseTimestamp + 2 * 60 * 60 * 1000);

    const result = await sut.execute(targetDate);

    expect(result.conditions).toBe('Cloudy');
  });

  it('should fallback to weatherApi if visualCrossingForecasts is empty', async () => {
    mockWeatherApi.execute.mockResolvedValue(mockForecasts);
    mockVisualCrossingApi.execute.mockResolvedValue(null);

    const targetDate = new Date(baseTimestamp + 5 * 60 * 60 * 1000);
    const result = await sut.execute(targetDate);

    expect(result.conditions).toBe('Rain');
  });

  it('should return undefined if both APIs return empty arrays', async () => {
    mockWeatherApi.execute.mockResolvedValue(null);
    mockVisualCrossingApi.execute.mockResolvedValue(null);

    await expect(sut.execute(new Date())).rejects.toThrow('No forecast data available from any API.');
  });
});
