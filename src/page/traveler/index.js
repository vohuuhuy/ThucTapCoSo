import React, { useState } from 'react'
import BackHome from '../backHome'
import { Form, InputNumber } from 'antd'
import GraphCity from './graphCity'
import './index.css'

const Traveler = Form.create({ name: 'traveler' })(
  props => {
  const [numCity, setNumCity] = useState(0)
  const [disable] = useState(false)

  return (
    <>
      <BackHome history={props.history}/>
      <p className='header'>Người đi du lịch</p>
      <div className='input'>
        <label style={{ marginRight: 20 }} htmlFor='elementNumber'>
          Nhập số thành phố:
        </label>
        <InputNumber
          id='elementNumber'
          defaultValue={numCity}
          min={0}
          onChange={value => setNumCity(value)}
          disabled={disable}
        />
      </div>
      <div className='graph'>
        <GraphCity
          width={400}
          height={400}
        />
      </div>
    </>
  )
})

export default Traveler