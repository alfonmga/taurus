import React from 'react'

import { Box, Typography } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'

import { useStoreState } from '~store'

import ChatMessage from '~components/ChatMessage'
import { useChatMessagesQuery } from '~generated/graphql-hooks'

export const CHAT_MESSAGES_PAGE_LIMIT = 4

/* const MOCK_DATA: any[] = [
  {
    id: '_4',
    message: 'Hi 👋🏻',
    user: {
      username: 'torvalds',
      displayName: 'Linus Torvalds',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/1024025?s=460&v=4',
    },
  },
  {
    id: '_2',
    message: 'Wow!',
    user: {
      username: 'alfonmga',
      displayName: 'Alfon',
      avatarUrl: 'https://avatars1.githubusercontent.com/u/9363272?v=4',
    },
  },
  {
    id: '_3',
    message: '80% of the effects come from 20% of the causes',
    user: {
      username: 'pareto123',
      displayName: 'Pareto',
      avatarUrl:
        'https://upload.wikimedia.org/wikipedia/commons/f/fd/Vilfredo_Pareto_1870s2.jpg',
    },
  },
  {
    id: '_1',
    message: 'Hello there!',
    user: {
      username: 'alfonmga',
      displayName: 'Alfon',
      avatarUrl: 'https://avatars1.githubusercontent.com/u/9363272?v=4',
    },
  },
] */

function ChatMessages(): JSX.Element {
  const userState = useStoreState(state => state.user)
  const [page, setPage] = React.useState(1)

  const { data: chatMessagesQueryData, refetch } = useChatMessagesQuery({
    variables: {
      dto: { offset: 0, limit: CHAT_MESSAGES_PAGE_LIMIT },
    },
    fetchPolicy: 'cache-and-network',
  })

  const totalCount = chatMessagesQueryData!.chatMessages.totalCount
  const chatMessages = chatMessagesQueryData!.chatMessages.data
  const totalPagesCount = Math.ceil(totalCount / 4)

  const onPaginationChange = async (page: number) => {
    const targetOffset = (page - 1) * CHAT_MESSAGES_PAGE_LIMIT
    await refetch({
      dto: { offset: targetOffset, limit: CHAT_MESSAGES_PAGE_LIMIT },
    })

    setPage(page)
  }

  return (
    <Box display="flex" flexDirection="column" flexShrink={0}>
      <Box
        display="flex"
        flexDirection="column"
        mb={chatMessages.length > 0 ? 2 : undefined}
      >
        {chatMessages.length === 0 && (
          <Box textAlign="center">
            <Typography variant="body1" color="textSecondary">
              No messages yet!
            </Typography>
          </Box>
        )}

        {chatMessages.map(message => (
          <ChatMessage
            key={message.id}
            avatarUrl={message.user.avatarUrl}
            username={message.user.username}
            displayName={message.user.displayName}
            message={message.message}
            me={message.user.username === userState.profile.username}
          />
        ))}
      </Box>

      {chatMessages.length > 0 && (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Pagination
            count={totalPagesCount}
            defaultPage={1}
            page={page}
            onChange={(_, page) => onPaginationChange(page)}
          />
        </Box>
      )}
    </Box>
  )
}

export default ChatMessages
