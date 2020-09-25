import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, OneToMany } from 'typeorm'

import BaseEntity from '~common/base-entity'
import ChatMessage from '~modules/chat/chatMessage.entity'

@ObjectType()
@Entity('users')
export default class User extends BaseEntity {
  @Column()
  provider: string

  @Column('text', { nullable: true })
  providerId?: string | null

  @Field(() => String)
  @Column('text', { nullable: true })
  username?: string | null

  @Field(() => String)
  @Column('text', { unique: true })
  email: string

  @Field(() => String)
  @Column('text', { unique: true })
  avatarUrl: string

  @Field(() => String)
  @Column('text')
  displayName: string

  @OneToMany(() => ChatMessage, (chatMessage) => chatMessage.user)
  chatMessages: ChatMessage[]
}
