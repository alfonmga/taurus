import * as yup from 'yup'

import { CreateChatMessage } from '../interfaces'

export const createChatMessageSchema: yup.ObjectSchema<CreateChatMessage> = yup
  .object()
  .shape({
    message: yup
      .string()
      .min(5, 'Too short')
      .max(140, 'Too long')
      .required('Cannot be empty')
      .defined(),
  })
  .defined()
