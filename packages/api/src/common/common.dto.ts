import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class PaginationDTO {
  @Field(() => Int)
  offset = 0

  @Field(() => Int)
  limit = 4
}
