import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleResolver } from './people.resolver';
import { PeopleService } from './people.service';
import { Person } from './person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  providers: [PeopleResolver, PeopleService],
})
export class PeopleModule {}
