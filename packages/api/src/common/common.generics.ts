import { Type } from '@nestjs/common'
import { ObjectType, Field, Int } from '@nestjs/graphql'

export function Paginated<T>(classRef: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [classRef])
    data: T[]

    @Field(() => Int)
    offset: number

    @Field(() => Int)
    limit: number

    @Field(() => Int)
    totalCount: number
  }
  return PaginatedType
}
