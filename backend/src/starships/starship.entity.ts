import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity('starships')
export class Starship {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  model?: string;

  @Field(() => Int)
  @Column({ type: 'int' })
  crew: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: 'int', nullable: true })
  passengers?: number;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true, name: 'starship_class' })
  starshipClass?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
