import { ObjectType, Field } from '@nestjs/graphql'
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm'

import BaseEntity from '~common/base-entity'
import User from '~modules/user/user.entity'

@ObjectType()
@Entity('chat_messages')
export default class ChatMessage extends BaseEntity {
  @Column('text')
  userId: string

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.chatMessages)
  @JoinColumn({ name: 'userId' })
  user: User

  @Field(() => String)
  @Column('text')
  message: string
}
