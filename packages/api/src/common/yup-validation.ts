import {
  applyDecorators,
  Catch,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
  UseFilters,
  UsePipes,
} from '@nestjs/common'
import { GqlExceptionFilter } from '@nestjs/graphql'
import { Schema, ValidationError } from 'yup'

import { InputErrorType } from './common.types'

interface YupValidationPipeValidationError {
  path: string
  message: string
}

class YupValidationPipeException extends HttpException {
  validationErrors: YupValidationPipeValidationError[]

  constructor(validationErrors: YupValidationPipeValidationError[]) {
    super('YupValidationPipeException', HttpStatus.BAD_REQUEST)
    this.validationErrors = validationErrors
  }
}

@Injectable()
export class YupValidationPipe implements PipeTransform {
  constructor(private readonly schema: Schema<any>) {}

  async transform(value: unknown): Promise<any> {
    try {
      await this.schema.validate(value, { abortEarly: false })
    } catch (err) {
      if (!(err instanceof ValidationError)) {
        throw new err()
      }

      const validationErrors: YupValidationPipeValidationError[] = []
      err.inner.map((value) => {
        validationErrors.push({
          path: value.path,
          message: value.message,
        })
      })

      throw new YupValidationPipeException(validationErrors)
    }

    return value
  }
}

@Catch(YupValidationPipeException)
export class YupValidationPipeExceptionGqlFilter implements GqlExceptionFilter {
  catch(exception: YupValidationPipeException): any {
    const inputErrorType = new InputErrorType()
    inputErrorType.validationErrors = exception.validationErrors

    return inputErrorType
  }
}

export function ValidateYupSchema(schema: Schema<any>): any {
  return applyDecorators(
    UsePipes(new YupValidationPipe(schema)),
    UseFilters(new YupValidationPipeExceptionGqlFilter()),
  )
}
