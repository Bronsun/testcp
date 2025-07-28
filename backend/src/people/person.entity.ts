import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity('people')
export class Person {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Field(() => Int, { nullable: true })
  @Column({ type: 'int', nullable: true })
  mass?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: 'int', nullable: true })
  height?: number;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 50, nullable: true })
  gender?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
