import React from 'react'
import { Form } from 'antd'
import BackHome from '../backHome'

const RabbitCarrot = Form.create({ name: 'rabbit-carrot' })(
  props => {
    return (
      <>
        <BackHome history={props.history}/>
        <p className='header'>Thỏ nhặt cà rốt</p>
      </>
    )
  }
)

export default RabbitCarrot