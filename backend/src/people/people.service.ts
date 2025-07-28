import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './person.entity';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async findAll(page: number = 1, limit: number = 10): Promise<{ data: Person[], total: number, page: number, totalPages: number }> {
    // Ensure minimum values
    page = Math.max(1, page);
    limit = Math.max(1, Math.min(100, limit)); // Cap at 100
    
    const skip = (page - 1) * limit;
    
    const [data, total] = await this.personRepository.findAndCount({
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

  async findOne(id: string): Promise<Person> {
    const person = await this.personRepository.findOne({ where: { id } });
    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }
    return person;
  }

  async findRandom(): Promise<Person> {
    const count = await this.personRepository.count();
    if (count === 0) {
      throw new Error('No people available');
    }
    
    // Use PostgreSQL's RANDOM() function for better randomness
    const randomPerson = await this.personRepository
      .createQueryBuilder('person')
      .orderBy('RANDOM()')
      .limit(1)
      .getOne();
    
    if (!randomPerson) {
      throw new Error('Failed to get random person');
    }
    
    return randomPerson;
  }
}
