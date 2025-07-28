import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { PeopleService } from './people.service';
import { Person } from './person.entity';

describe('PeopleService', () => {
  let service: PeopleService;
  let repository: Repository<Person>;

  const mockPerson: Person = {
    id: '1',
    name: 'Alex Nova',
    mass: 77,
    height: 172,
    gender: 'male',
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockPeople: Person[] = [
    mockPerson,
    {
      id: '2',
      name: 'Dr. Elena Cross',
      mass: 49,
      height: 150,
      gender: 'female',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '3',
      name: 'Commander Rex',
      mass: 80,
      height: 180,
      gender: 'male',
      created_at: new Date(),
      updated_at: new Date(),
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
        PeopleService,
        {
          provide: getRepositoryToken(Person),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PeopleService>(PeopleService);
    repository = module.get<Repository<Person>>(getRepositoryToken(Person));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated people with default pagination', async () => {
      mockRepository.findAndCount.mockResolvedValue([mockPeople, 3]);

      const result = await service.findAll();

      expect(result).toEqual({
        data: mockPeople,
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

    it('should return paginated people with custom pagination', async () => {
      const page2People = [mockPeople[2]];
      mockRepository.findAndCount.mockResolvedValue([page2People, 3]);

      const result = await service.findAll(2, 2);

      expect(result).toEqual({
        data: page2People,
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
      mockRepository.findAndCount.mockResolvedValue([mockPeople, 3]);

      const result = await service.findAll(0, 0);

      expect(result.page).toBe(1);
      expect(mockRepository.findAndCount).toHaveBeenCalledWith({
        skip: 0,
        take: 1,
        order: { name: 'ASC' },
      });
    });

    it('should cap limit at 100', async () => {
      mockRepository.findAndCount.mockResolvedValue([mockPeople, 3]);

      await service.findAll(1, 200);

      expect(mockRepository.findAndCount).toHaveBeenCalledWith({
        skip: 0,
        take: 100,
        order: { name: 'ASC' },
      });
    });
  });

  describe('findOne', () => {
    it('should return a person when valid id is provided', async () => {
      mockRepository.findOne.mockResolvedValue(mockPerson);

      const result = await service.findOne('1');

      expect(result).toEqual(mockPerson);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should throw NotFoundException when person is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
      await expect(service.findOne('999')).rejects.toThrow('Person with ID 999 not found');
    });
  });

  describe('findRandom', () => {
    it('should return a random person', async () => {
      const mockQueryBuilder = {
        orderBy: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(mockPerson),
      };

      mockRepository.count.mockResolvedValue(3);
      mockRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);

      const result = await service.findRandom();

      expect(result).toEqual(mockPerson);
      expect(mockRepository.count).toHaveBeenCalled();
      expect(mockRepository.createQueryBuilder).toHaveBeenCalledWith('person');
      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith('RANDOM()');
      expect(mockQueryBuilder.limit).toHaveBeenCalledWith(1);
    });

    it('should throw error when no people are available', async () => {
      mockRepository.count.mockResolvedValue(0);

      await expect(service.findRandom()).rejects.toThrow('No people available');
    });

    it('should throw error when random query fails', async () => {
      const mockQueryBuilder = {
        orderBy: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(null),
      };

      mockRepository.count.mockResolvedValue(3);
      mockRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);

      await expect(service.findRandom()).rejects.toThrow('Failed to get random person');
    });
  });
});
