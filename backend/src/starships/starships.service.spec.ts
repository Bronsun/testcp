import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { Starship } from './starship.entity';

describe('StarshipsService', () => {
  let service: StarshipsService;
  let repository: Repository<Starship>;

  const mockStarship: Starship = {
    id: '1',
    name: 'Titan Station',
    model: 'DS-1 Orbital Battle Platform',
    crew: 342953,
    passengers: 843342,
    starshipClass: 'Deep Space Mobile Station',
    created_at: new Date('2023-01-01'),
    updated_at: new Date('2023-01-01'),
  };

  const mockStarships: Starship[] = [
    mockStarship,
    {
      id: '2',
      name: 'Phoenix Runner',
      model: 'YT-1300 light freighter',
      crew: 4,
      passengers: 6,
      starshipClass: 'Light freighter',
      created_at: new Date('2023-01-01'),
      updated_at: new Date('2023-01-01'),
    },
    {
      id: '3',
      name: 'Eagle Strike',
      model: 'T-65 X-wing starfighter',
      crew: 1,
      passengers: 0,
      starshipClass: 'Starfighter',
      created_at: new Date('2023-01-01'),
      updated_at: new Date('2023-01-01'),
    },
  ];

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    findAndCount: jest.fn(),
    createQueryBuilder: jest.fn(),
    count: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StarshipsService,
        {
          provide: getRepositoryToken(Starship),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<StarshipsService>(StarshipsService);
    repository = module.get<Repository<Starship>>(getRepositoryToken(Starship));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated starships with default pagination', async () => {
      mockRepository.findAndCount.mockResolvedValue([mockStarships, 3]);

      const result = await service.findAll();

      expect(result).toEqual({
        data: mockStarships,
        total: 3,
        page: 1,
        totalPages: 1,
      });
      expect(mockRepository.findAndCount).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        order: { name: 'ASC' },
      });
    });

    it('should return paginated starships with custom pagination', async () => {
      const page2Starships = [mockStarships[2]];
      mockRepository.findAndCount.mockResolvedValue([page2Starships, 3]);

      const result = await service.findAll(2, 2);

      expect(result).toEqual({
        data: page2Starships,
        total: 3,
        page: 2,
        totalPages: 2,
      });
      expect(mockRepository.findAndCount).toHaveBeenCalledWith({
        skip: 2,
        take: 2,
        order: { name: 'ASC' },
      });
    });

    it('should handle edge cases for pagination parameters', async () => {
      mockRepository.findAndCount.mockResolvedValue([mockStarships, 3]);

      const result = await service.findAll(0, 0);

      expect(result.page).toBe(1);
      expect(mockRepository.findAndCount).toHaveBeenCalledWith({
        skip: 0,
        take: 1,
        order: { name: 'ASC' },
      });
    });

    it('should cap limit at 100', async () => {
      mockRepository.findAndCount.mockResolvedValue([mockStarships, 3]);

      await service.findAll(1, 200);

      expect(mockRepository.findAndCount).toHaveBeenCalledWith({
        skip: 0,
        take: 100,
        order: { name: 'ASC' },
      });
    });
  });

  describe('findOne', () => {
    it('should return a starship when valid id is provided', async () => {
      mockRepository.findOne.mockResolvedValue(mockStarship);

      const result = await service.findOne('1');

      expect(result).toEqual(mockStarship);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should throw NotFoundException when starship is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
      await expect(service.findOne('999')).rejects.toThrow('Starship with ID 999 not found');
    });
  });

  describe('findRandom', () => {
    it('should return a random starship', async () => {
      const mockQueryBuilder = {
        orderBy: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(mockStarship),
      };

      mockRepository.count.mockResolvedValue(3);
      mockRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);

      const result = await service.findRandom();

      expect(result).toEqual(mockStarship);
      expect(mockRepository.count).toHaveBeenCalled();
      expect(mockRepository.createQueryBuilder).toHaveBeenCalledWith('starship');
      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith('RANDOM()');
      expect(mockQueryBuilder.limit).toHaveBeenCalledWith(1);
    });

    it('should throw error when no starships are available', async () => {
      mockRepository.count.mockResolvedValue(0);

      await expect(service.findRandom()).rejects.toThrow('No starships available');
    });

    it('should throw error when random query fails', async () => {
      const mockQueryBuilder = {
        orderBy: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(null),
      };

      mockRepository.count.mockResolvedValue(3);
      mockRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);

      await expect(service.findRandom()).rejects.toThrow('Failed to get random starship');
    });
  });
});
