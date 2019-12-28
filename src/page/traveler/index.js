import React, { useState } from 'react'
import BackHome from '../backHome'
import { Form, InputNumber, Modal, Icon } from 'antd'
import './index.css'

const Traveler = Form.create({ name: 'traveler' })(
  props => {
  const [numCity, setNumCity] = useState(0)
  const [disable] = useState(false)

  const modalDetail = () => {
    Modal.info({
      title: (<div className='detail-title'>Người đi du lịch</div>),
      content: ( <div className='detai-content'>
        Cho n thành phố đánh số từ 1 đến n và m tuyến đường giao thông hai chiều giữa chúng
        , mạng lưới giao thông này được cho bởi bảng C cấp nxn, ở đây
         C[i, j] = C[j, i] = Chi phí đi đoạn đường trực tiếp từ thành phố i đến thành phố j
        . Giả thiết rằng C[i, i] = 0 với ∀i, C[i, j] = +∞ nếu
         không có đường trực tiếp từ thành phố i đến thành phố j
        . Một người du lịch xuất phát từ thành phố 1,
         muốn đi thăm tất cả các thành phố còn lại mỗi thành phố đúng 1 lần và
          cuối cùng quay lại thành phố 1
        . Hãy chỉ ra cho người đó hành trình với chi phí ít nhất.
        </div>),
      okText: 'Đã hiểu',
      style: {
        color: '#4bb6e2'
      }
    })
  }

  return (
    <>
      <BackHome history={props.history}/>
      <p className='header'>Người đi du lịch
        <Icon
          className='icon-detail'
          type='info-circle'
          onClick={modalDetail} 
        />
      </p>
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
    </>
  )
})

export default Traveler