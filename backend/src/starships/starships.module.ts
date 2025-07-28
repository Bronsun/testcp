import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StarshipsResolver } from './starships.resolver';
import { StarshipsService } from './starships.service';
import { Starship } from './starship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Starship])],
  providers: [StarshipsResolver, StarshipsService],
})
export class StarshipsModule {}
