import { Field, ID, GraphQLISODateTime, ObjectType } from '@nestjs/graphql'
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity as TypeormBaseEntity,
} from 'typeorm'

@ObjectType()
export default class BaseEntity extends TypeormBaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public updatedAt: Date

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date
}
