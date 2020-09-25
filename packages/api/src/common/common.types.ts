import { Field, ID, ObjectType, ArgsType, Int } from '@nestjs/graphql'

@ObjectType()
export class SuccessfulOperationType {
  constructor() {
    this.success = true
  }

  @Field()
  success: boolean
}

@ObjectType()
export class SuccessfulCreatedType extends SuccessfulOperationType {
  constructor(id: string) {
    super()
    this.id = id
  }

  @Field(() => ID)
  id: string
}

@ObjectType()
class InputErrorFieldType {
  @Field()
  path: string

  @Field()
  message: string
}

@ObjectType()
export class InputErrorType {
  @Field(() => [InputErrorFieldType])
  validationErrors: InputErrorFieldType[]
}
