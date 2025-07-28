import { Resolver, Query, Args } from '@nestjs/graphql';
import { Starship } from './starship.entity';
import { StarshipsService } from './starships.service';
import { PaginationInput } from '../common/pagination.input';
import { Paginated } from '../common/paginated-response';

const PaginatedStarship = Paginated(Starship);

@Resolver(() => Starship)
export class StarshipsResolver {
  constructor(private readonly starshipsService: StarshipsService) {}

  @Query(() => PaginatedStarship, { name: 'starships' })
  async findAll(@Args('pagination', { nullable: true }) pagination?: PaginationInput) {
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    
    const result = await this.starshipsService.findAll(page, limit);
    
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

  @Query(() => Starship, { name: 'starship', nullable: true })
  async findOne(@Args('id') id: string): Promise<Starship> {
    return this.starshipsService.findOne(id);
  }

  @Query(() => Starship, { name: 'randomStarship' })
  async findRandom(): Promise<Starship> {
    return this.starshipsService.findRandom();
  }
}
