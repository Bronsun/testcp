import { Resolver, Query, Args } from '@nestjs/graphql';
import { Person } from './person.entity';
import { PeopleService } from './people.service';
import { PaginationInput } from '../common/pagination.input';
import { Paginated } from '../common/paginated-response';

const PaginatedPerson = Paginated(Person);

@Resolver(() => Person)
export class PeopleResolver {
  constructor(private readonly peopleService: PeopleService) {}

  @Query(() => PaginatedPerson, { name: 'people' })
  async findAll(@Args('pagination', { nullable: true }) pagination?: PaginationInput) {
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    
    const result = await this.peopleService.findAll(page, limit);
    
    return {
      data: result.data,
      pagination: {
        total: result.total,
        page: result.page,
        totalPages: result.totalPages,
        limit
      }
    };
  }

  @Query(() => Person, { name: 'person', nullable: true })
  async findOne(@Args('id') id: string): Promise<Person> {
    return this.peopleService.findOne(id);
  }

  @Query(() => Person, { name: 'randomPerson' })
  async findRandom(): Promise<Person> {
    return this.peopleService.findRandom();
  }
}
