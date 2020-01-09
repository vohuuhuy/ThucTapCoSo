import React, { useState, useCallback } from 'react'
import { Form, Icon, Modal, InputNumber } from 'antd'
import BackHome from '../backHome'
import './index.css'

const RabbitCarrot = Form.create({ name: 'rabbit-carrot' })(
  props => {
    const [loRab] = useState([0,0])
    const [map, setMap] = useState([[0]])
    const [carrot, setCarrot] = useState({ x: 0, y: 0 })
    const modalDetail = useCallback(() => {
      Modal.info({
        title: (<div className='detail-title'>Thỏ nhặt cà rốt</div>),
        content: (<div className='detail-content'>
          Cho một bản đồ số gồm số 1 và 0. số 1 là đường đi 0 là bờ (ko đi được) Con thỏ đang đứng ở vị trí 1,1
          . Cà rốt được đặt trong đường đi bản đồ
          . Chương trình kiểm tra thỏ có đến được vị trí cà rốt được không? Nếu được thì tìm số bước đi ít nhất để đến.
          </div>),
        okText: 'Đã hiểu'
      })
    }, [])
    const onChangeMap = useCallback(
      ({ col, row }) => {
        const a = []
        const b = []
        for (let j = 0; j < col; j++) {
          b.push(0)
        }
        for (let i = 0; i < row; i++) {
          a.push(b)
        }
        setMap(a)
      }
    , [])
    const handleClickCell = useCallback(
      (i, j) => {
        setMap(map.map((row, is) => row.length && row.map((col, js) => i === is && j === js ? !col ? 1 : 0 : col)))
      }
    , [map])
    return (
      <>
        <BackHome history={props.history}/>
        <p className='header'>
          Thỏ nhặt cà rốt
          <Icon
            className='icon-detail'
            type='info-circle'
            onClick={modalDetail}
          />
        </p>
        <div className='input'>
          <label style={{ marginRight: 20 }} htmlFor='elementNumber1'>
            Số hàng:
          </label>
          <InputNumber
            id='elementNumber1'
            defaultValue={1}
            min={1}
            max={15}
            onChange={value => onChangeMap({ row: value, col: map.length ? map[0].length : 1 })}
            autoFocus={false}
          />
        </div>
        <div className='input'>
          <label style={{ marginRight: 20 }} htmlFor='elementNumber2'>
            Số cột:
          </label>
          <InputNumber
            id='elementNumber2'
            defaultValue={1}
            min={1}
            max={15}
            onChange={value => onChangeMap({ row: map.length ? map.length: 1, col: value })}
            autoFocus={false}
          />
        </div>
        <div className='input' style={{ marginBottom: 10 }}>
          <div>
            Tọa độ Carrot
          </div>
          <div>
            <label style={{ marginRight: 20 }} htmlFor='elementNumber3'>
              X:
            </label>
            <InputNumber
              id='elementNumber3'
              defaultValue={0}
              min={0}
              max={map.length ? map[0].length - 1 : 0}
              onChange={value => setCarrot({ ...carrot, x: value })}
              style={{ marginRight: 30 }}
              autoFocus={false}
            />
            <label style={{ marginRight: 20 }} htmlFor='elementNumber4'>
              Y:
            </label>
            <InputNumber
              id='elementNumber4'
              defaultValue={0}
              min={0}
              max={map.length - 1}
              onChange={value => setCarrot({ ...carrot, y: value })}
              autoFocus={false}
            />
          </div>
        </div>
        <div className='map'>
          {
            map.map((row, i) => (
              <div className='row'>
                {
                  row.map((col, j) => (
                    <div
                      key={`${i}-${j}`}
                      className={`cell ${ (i === loRab[0] && j === loRab[1]) ? 'rabbit' : (i === carrot.y && j === carrot.x) ? 'carrot' : '' }`}
                      onClick={() => !(i === loRab[0] && j === loRab[1]) && !(i === carrot.y && j === carrot.x) ? handleClickCell(i, j) : ''}
                      style={{ background: col === 1 ? '#516871' : 'white' }}
                    />
                  ))
                }
              </div>
            ))
          }
        </div>
      </>
    )
  }
)

export default RabbitCarrot