import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Starship } from './starship.entity';

@Injectable()
export class StarshipsService {
  constructor(
    @InjectRepository(Starship)
    private readonly starshipRepository: Repository<Starship>,
  ) {}

  async findAll(page: number = 1, limit: number = 10): Promise<{ data: Starship[], total: number, page: number, totalPages: number }> {
    // Ensure minimum values
    page = Math.max(1, page);
    limit = Math.max(1, Math.min(100, limit)); // Cap at 100
    
    const skip = (page - 1) * limit;
    
    const [data, total] = await this.starshipRepository.findAndCount({
      skip,
      take: limit,
      order: { name: 'ASC' } // Add consistent ordering
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      page,
      totalPages
    };
  }

  async findOne(id: string): Promise<Starship> {
    const starship = await this.starshipRepository.findOne({ where: { id } });
    if (!starship) {
      throw new NotFoundException(`Starship with ID ${id} not found`);
    }
    return starship;
  }

  async findRandom(): Promise<Starship> {
    const count = await this.starshipRepository.count();
    if (count === 0) {
      throw new Error('No starships available');
    }
    
    // Use PostgreSQL's RANDOM() function for better randomness
    const randomStarship = await this.starshipRepository
      .createQueryBuilder('starship')
      .orderBy('RANDOM()')
      .limit(1)
      .getOne();
    
    if (!randomStarship) {
      throw new Error('Failed to get random starship');
    }
    
    return randomStarship;
  }
}
