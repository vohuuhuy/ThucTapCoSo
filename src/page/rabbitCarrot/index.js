import React, { useState, useCallback } from 'react'
import { Form, Icon, Modal, InputNumber, Button, Checkbox } from 'antd'
import BackHome from '../backHome'
import './index.css'
import { sleep } from '../../common'
let map = [[2]]
const RabbitCarrot = Form.create({ name: 'rabbit-carrot' })(
  props => {
    const [render, setRender] = useState(true)
    const [carrot, setCarrot] = useState({ x: 0, y: 0 })
    const [disable, setDisable] = useState(false)
    const [branch, setBranch] = useState(false)
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
        map = a.map((row, i) => row.length ? row.map((col, j) => !i && !j ? 2 : col) : row)
        setRender(!render)
      }
    , [render])
    const handleClickCell = useCallback(
      (i, j) => {
        map = map.map((row, is) => row.length && row.map((col, js) => i === is && j === js ? !col ? 1 : 0 : col))
        setRender(!render)
      }
    , [render])
    const onClickStart = useCallback(async () => {
      setDisable(true)
      const move = {
        top: { x: -1, y: 0 },
        right: { x: 0, y: 1 },
        bottom: { x: 1, y: 0 },
        left: { x: 0, y: -1 }
      }
      const keyMove = Object.keys(move)
      const Try = async local => {
        if (local.x === carrot.x && local.y === carrot.y) {
          setRender(!render)
          await sleep(1000)
        } else {
          for (const key of keyMove) {
            const exaX = local.x + move[key].x
            const exaY = local.y + move[key].y
            if (0 <= exaX && exaX < map.length && 0 <= exaY && exaY < map[0].length
              && map[exaX][exaY] === 0
            ) {
              map[local.x][local.y] = 3
              map[exaX][exaY] = 2
              await Try({ x: exaX, y: exaY })
              map[exaX][exaY] = 0
              map[local.x][local.y] = 2
            }
          }
        }
      }
      await Try({ x: 0, y: 0})
    }, [carrot, render])

    console.log(map)

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
            disabled={disable}
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
            disabled={disable}
          />
        </div>
        <div className='input'>
          <label style={{ marginLeft: 28, marginRight: 20 }} htmlFor='branch'>
            Nhánh cận:
          </label>
          <Checkbox
            id='branch'
            defaultValue={branch}
            onChange={value => setBranch(value.target.checked)}
            disabled={disable}
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
              disabled={disable}
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
              disabled={disable}
            />
          </div>
        </div>
        <div className='map'>
          {
            map.map((row, i) => (
              <div className='row' key={i}>
                {
                  row.map((col, j) => (
                    <div
                      key={`${i}-${j}`}
                      className={`cell ${ col === 2 ? 'rabbit' : (i === carrot.y && j === carrot.x) ? 'carrot' : '' }`}
                      onClick={() => !(col === 2) && !(i === carrot.y && j === carrot.x) && !disable ? handleClickCell(i, j) : ''}
                      style={{ background: col === 1 ? '#516871' : col === 3 ? '#6fc754' :'white' }}
                    />
                  ))
                }
              </div>
            ))
          }
        </div>
        <Button
          onClick={onClickStart}
          disabled={disable}
          style={{ marginTop: 30 }}
        >
          Bắt đầu
        </Button>
      </>
    )
  }
)

export default RabbitCarrot