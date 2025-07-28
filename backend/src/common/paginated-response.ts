import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PaginationInfo {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  limit: number;
}

export function Paginated<T>(TClass: new () => T) {
  @ObjectType(`Paginated${TClass.name}`)
  abstract class PaginatedType {
    @Field(() => [TClass])
    data: T[];

    @Field(() => PaginationInfo)
    pagination: PaginationInfo;
  }
  return PaginatedType;
}
