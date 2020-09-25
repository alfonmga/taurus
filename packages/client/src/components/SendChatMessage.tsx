import React from 'react'

import { Button, Box, makeStyles, CircularProgress } from '@material-ui/core'
import { createChatMessageSchema } from '@taurus/shared'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'

import { CHAT_MESSAGES_PAGE_LIMIT } from '~components/ChatMessages'
import {
  useCreateChatMessageMutation,
  ChatMessagesDocument,
} from '~generated/graphql-hooks'
import transformInputErrorTypeToFormikError from '~utils/transformInputErrorTypeToFormikError.util'

const useStyles = makeStyles(() => ({
  sendButton: {
    marginLeft: '5px',
  },
}))

function SendChatMessageForm({
  submitForm,
  isSubmitting,
}: {
  submitForm: () => Promise<any>
  isSubmitting: boolean
}): JSX.Element {
  const classes = useStyles()

  return (
    <Form>
      <Box display="flex" flexDirection="row">
        <Field
          component={TextField}
          name="message"
          type="text"
          label="What are you up to?"
          variant="filled"
        />
        <Button
          color="primary"
          variant="contained"
          size="large"
          disabled={isSubmitting}
          onClick={submitForm}
          className={classes.sendButton}
        >
          {isSubmitting && <CircularProgress size={14} />}
          {!isSubmitting && 'SEND'}
        </Button>
      </Box>
    </Form>
  )
}

function SendChatMessage(): JSX.Element {
  const [createChatMessageMutation] = useCreateChatMessageMutation()

  return (
    <Formik
      initialValues={{
        message: '',
      }}
      validationSchema={createChatMessageSchema}
      onSubmit={async (values, { setSubmitting, resetForm, setErrors }) => {
        const { message } = values

        try {
          const { data } = await createChatMessageMutation({
            variables: { dto: { message } },
            refetchQueries: [
              {
                query: ChatMessagesDocument,
                variables: {
                  dto: { offset: 0, limit: CHAT_MESSAGES_PAGE_LIMIT },
                },
              },
            ],
          })

          const createChatMessageMutationData = data!.createChatMessage
          switch (createChatMessageMutationData.__typename) {
            case 'SuccessfulCreatedType':
              resetForm()
              return
            case 'InputErrorType':
              setErrors(
                transformInputErrorTypeToFormikError(
                  createChatMessageMutationData.validationErrors,
                ),
              )
              return
          }
        } catch (e) {
          console.error(e)
          alert('An unexpected error ocurred')

          setSubmitting(false)
        }
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <SendChatMessageForm
          submitForm={submitForm}
          isSubmitting={isSubmitting}
        />
      )}
    </Formik>
  )
}

export default SendChatMessage
