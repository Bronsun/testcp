import { Test, TestingModule } from '@nestjs/testing';
import { StarshipsResolver } from './starships.resolver';
import { StarshipsService } from './starships.service';
import { Starship } from './starship.entity';
import { PaginationInput } from '../common/pagination.input';

describe('StarshipsResolver', () => {
  let resolver: StarshipsResolver;
  let service: StarshipsService;

  const mockStarship: Starship = {
    id: '1',
    name: 'Titan Station',
    model: 'DS-1 Orbital Battle Station',
    crew: 342953,
    passengers: 843342,
    starshipClass: 'Deep Space Mobile Battlestation',
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockPaginatedResult = {
    data: [mockStarship],
    total: 1,
    page: 1,
    totalPages: 1,
  };

  const mockStarshipsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    findRandom: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StarshipsResolver,
        {
          provide: StarshipsService,
          useValue: mockStarshipsService,
        },
      ],
    }).compile();

    resolver = module.get<StarshipsResolver>(StarshipsResolver);
    service = module.get<StarshipsService>(StarshipsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated starships with default pagination', async () => {
      mockStarshipsService.findAll.mockResolvedValue(mockPaginatedResult);

      const result = await resolver.findAll();

      expect(result).toEqual({
        data: mockPaginatedResult.data,
        pagination: {
          total: 1,
          page: 1,
          totalPages: 1,
          limit: 10,
        },
      });
      expect(mockStarshipsService.findAll).toHaveBeenCalledWith(1, 10);
    });

    it('should return paginated starships with custom pagination', async () => {
      const customPagination: PaginationInput = { page: 2, limit: 5 };
      const customResult = {
        data: [mockStarship],
        total: 10,
        page: 2,
        totalPages: 2,
      };

      mockStarshipsService.findAll.mockResolvedValue(customResult);

      const result = await resolver.findAll(customPagination);

      expect(result).toEqual({
        data: customResult.data,
        pagination: {
          total: 10,
          page: 2,
          totalPages: 2,
          limit: 5,
        },
      });
      expect(mockStarshipsService.findAll).toHaveBeenCalledWith(2, 5);
    });

    it('should handle null pagination input', async () => {
      mockStarshipsService.findAll.mockResolvedValue(mockPaginatedResult);

      const result = await resolver.findAll(null);

      expect(result).toBeDefined();
      expect(mockStarshipsService.findAll).toHaveBeenCalledWith(1, 10);
    });
  });

  describe('findOne', () => {
    it('should return a starship by id', async () => {
      mockStarshipsService.findOne.mockResolvedValue(mockStarship);

      const result = await resolver.findOne('1');

      expect(result).toEqual(mockStarship);
      expect(mockStarshipsService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('findRandom', () => {
    it('should return a random starship', async () => {
      mockStarshipsService.findRandom.mockResolvedValue(mockStarship);

      const result = await resolver.findRandom();

      expect(result).toEqual(mockStarship);
      expect(mockStarshipsService.findRandom).toHaveBeenCalled();
    });
  });
});
