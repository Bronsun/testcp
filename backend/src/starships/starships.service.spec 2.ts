import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { CreateStarshipInput, UpdateStarshipInput } from './starship.input';

describe('StarshipsService', () => {
  let service: StarshipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StarshipsService],
    }).compile();

    service = module.get<StarshipsService>(StarshipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of starships', () => {
      const result = service.findAll();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('crew');
    });
  });

  describe('findOne', () => {
    it('should return a starship when valid id is provided', () => {
      const result = service.findOne('1');
      expect(result).toBeDefined();
      expect(result.id).toBe('1');
      expect(result.name).toBe('Death Star');
    });

    it('should throw NotFoundException when starship is not found', () => {
      expect(() => service.findOne('999')).toThrow(NotFoundException);
    });
  });

  describe('findRandom', () => {
    it('should return a random starship', () => {
      const result = service.findRandom();
      expect(result).toBeDefined();
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('crew');
    });
  });

  describe('create', () => {
    it('should create a new starship', () => {
      const createStarshipInput: CreateStarshipInput = {
        name: 'Test Ship',
        model: 'Test Model',
        crew: 100,
        passengers: 50,
        starshipClass: 'Test Class',
      };

      const result = service.create(createStarshipInput);
      expect(result).toBeDefined();
      expect(result.name).toBe(createStarshipInput.name);
      expect(result.crew).toBe(createStarshipInput.crew);
      expect(result.id).toBeDefined();
    });
  });

  describe('update', () => {
    it('should update an existing starship', () => {
      const updateStarshipInput: UpdateStarshipInput = {
        name: 'Updated Death Star',
        crew: 400000,
      };

      const result = service.update('1', updateStarshipInput);
      expect(result).toBeDefined();
      expect(result.name).toBe(updateStarshipInput.name);
      expect(result.crew).toBe(updateStarshipInput.crew);
      expect(result.id).toBe('1');
    });

    it('should throw NotFoundException when starship is not found', () => {
      const updateStarshipInput: UpdateStarshipInput = {
        name: 'Updated Name',
      };

      expect(() => service.update('999', updateStarshipInput)).toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete an existing starship', () => {
      const initialCount = service.findAll().length;
      const result = service.delete('1');
      
      expect(result).toBe(true);
      expect(service.findAll().length).toBe(initialCount - 1);
    });

    it('should throw NotFoundException when starship is not found', () => {
      expect(() => service.delete('999')).toThrow(NotFoundException);
    });
  });
});
