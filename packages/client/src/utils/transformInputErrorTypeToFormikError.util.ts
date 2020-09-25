import { InputErrorFieldType } from '~generated/graphql-hooks'

const transformInputErrorTypeToFormikError = (
  inputErrorFieldTypes: InputErrorFieldType[],
): { [path: string]: string } =>
  inputErrorFieldTypes.reduce(
    (acc, currentInputErrorFieldType) => ({
      ...acc,
      [currentInputErrorFieldType.path]: currentInputErrorFieldType.message,
    }),
    {},
  )

export default transformInputErrorTypeToFormikError
