import React from 'react'
import { Button, Icon } from 'antd'

export default function BackTop (props) {
  return (
    <Button
      ghost
      onClick={() => props.history.push('/')}
    >
      <Icon type='rollback'/>
    </Button>
  )
}