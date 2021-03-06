import React from 'react'
import { ActivityIndicator, Flex, Typography } from '@etvas/etvaskit'
import { T } from '@etvas/i18n'

const AuthorizingIndicator = () => (
  <Flex
    alignItems='center'
    flexDirection='column'
    justifyContent='center'
    position='absolute'
    width='100%'
    height='100%'>
    <ActivityIndicator
      colors={{ background: 'white', primary: 'info' }}
      size='64px'
    />
    <Typography variant='labelSmall' mt={2}>
      <T label='label.authorizing' />
      ...
    </Typography>
  </Flex>
)

export default AuthorizingIndicator
