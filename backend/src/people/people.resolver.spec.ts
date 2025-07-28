import { Test, TestingModule } from '@nestjs/testing';
import { PeopleResolver } from './people.resolver';
import { PeopleService } from './people.service';
import { Person } from './person.entity';
import { PaginationInput } from '../common/pagination.input';

describe('PeopleResolver', () => {
  let resolver: PeopleResolver;
  let service: PeopleService;

  const mockPerson: Person = {
    id: '1',
    name: 'Alex Nova',
    mass: 77,
    height: 172,
    gender: 'male',
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockPaginatedResult = {
    data: [mockPerson],
    total: 1,
    page: 1,
    totalPages: 1,
  };

  const mockPeopleService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    findRandom: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PeopleResolver,
        {
          provide: PeopleService,
          useValue: mockPeopleService,
        },
      ],
    }).compile();

    resolver = module.get<PeopleResolver>(PeopleResolver);
    service = module.get<PeopleService>(PeopleService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated people with default pagination', async () => {
      mockPeopleService.findAll.mockResolvedValue(mockPaginatedResult);

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
      expect(mockPeopleService.findAll).toHaveBeenCalledWith(1, 10);
    });

    it('should return paginated people with custom pagination', async () => {
      const customPagination: PaginationInput = { page: 2, limit: 5 };
      const customResult = {
        data: [mockPerson],
        total: 10,
        page: 2,
        totalPages: 2,
      };

      mockPeopleService.findAll.mockResolvedValue(customResult);

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
      expect(mockPeopleService.findAll).toHaveBeenCalledWith(2, 5);
    });

    it('should handle null pagination input', async () => {
      mockPeopleService.findAll.mockResolvedValue(mockPaginatedResult);

      const result = await resolver.findAll(null);

      expect(result).toBeDefined();
      expect(mockPeopleService.findAll).toHaveBeenCalledWith(1, 10);
    });
  });

  describe('findOne', () => {
    it('should return a person by id', async () => {
      mockPeopleService.findOne.mockResolvedValue(mockPerson);

      const result = await resolver.findOne('1');

      expect(result).toEqual(mockPerson);
      expect(mockPeopleService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('findRandom', () => {
    it('should return a random person', async () => {
      mockPeopleService.findRandom.mockResolvedValue(mockPerson);

      const result = await resolver.findRandom();

      expect(result).toEqual(mockPerson);
      expect(mockPeopleService.findRandom).toHaveBeenCalled();
    });
  });
});
