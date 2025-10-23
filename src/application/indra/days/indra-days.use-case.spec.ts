import { Test, TestingModule } from '@nestjs/testing';
import { IndraDaysUseCase } from './indra-days.use-case';
import { VISUAL_CROSSING_API, WEATHER_API } from '@src/shared/constants';
import { IndraEntity } from '@src/domain/entities/indra.entity';

describe('IndraDaysUseCase', () => {
  let sut: IndraDaysUseCase;
  let mockWeatherApi: { execute: jest.Mock };
  let mockVisualCrossingApi: { execute: jest.Mock };

  const mockForecast = IndraEntity.build({
    conditions: 'Sunny',
    timestamp: new Date().setHours(0, 0, 0, 0) + 2 * 24 * 60 * 60 * 1000,
    temperature: 25,
    date: new Date().toISOString(),
    description: 'A sunny day',
    humidity: 50,
    feelsLike: 27,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IndraDaysUseCase,
        { provide: WEATHER_API, useValue: { execute: jest.fn() } },
        { provide: VISUAL_CROSSING_API, useValue: { execute: jest.fn() } },
      ],
    }).compile();

    sut = module.get<IndraDaysUseCase>(IndraDaysUseCase);
    mockWeatherApi = module.get(WEATHER_API);
    mockVisualCrossingApi = module.get(VISUAL_CROSSING_API);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should return forecasts in the 3-day period', async () => {
    mockWeatherApi.execute.mockResolvedValue([]);
    mockVisualCrossingApi.execute.mockResolvedValue([mockForecast]);

    const spySetTimestamp = jest.spyOn(mockForecast, 'setTimestamp');
    const spySetDate = jest.spyOn(mockForecast, 'setDate');

    const result = await sut.execute();

    expect(result).toHaveLength(1);
    expect(spySetTimestamp).toHaveBeenCalled();
    expect(spySetDate).toHaveBeenCalled();
  });

  it('should fallback to weatherApi if visualCrossingApi returns null', async () => {
    mockVisualCrossingApi.execute.mockResolvedValue(null);
    mockWeatherApi.execute.mockResolvedValue([mockForecast]);

    const result = await sut.execute();

    expect(result).toHaveLength(1);
  });

  it('should return empty array if both APIs return null', async () => {
    mockVisualCrossingApi.execute.mockResolvedValue(null);
    mockWeatherApi.execute.mockResolvedValue(null);

    const result = await sut.execute();

    expect(result).toEqual([]);
  });

  it('should skip forecasts outside the 3-day period', async () => {
    const pastForecast = {
      timestamp: new Date().getTime() - 24 * 60 * 60 * 1000,
      setTimestamp: jest.fn().mockReturnThis(),
      setDate: jest.fn().mockReturnThis(),
    } as any;

    mockVisualCrossingApi.execute.mockResolvedValue([pastForecast]);
    mockWeatherApi.execute.mockResolvedValue([]);

    const result = await sut.execute();
    expect(result).toEqual([]);
    expect(pastForecast.setTimestamp).not.toHaveBeenCalled();
  });
});
