import React, { useState, useCallback } from 'react'
import BackHome from '../backHome'
import { Form, InputNumber, Modal, Icon, Button, Checkbox } from 'antd'
import './index.css'
import { sleep } from '../../common'

const Traveler = Form.create({ name: 'traveler' })(
  props => {
  const [numCity, setNumCity] = useState(0)
  const [disable, setDisable] = useState(false)
  const [matrix, setMatrix] = useState([])
  const [res, setRes] = useState([])
  const [pri, setPri] = useState(0)
  const [resT, setResT] = useState({ path: '', value: 0 })
  const [time, setTime] = useState(0)
  const [branch, setBranch] = useState(false)

  const modalDetail = () => {
    Modal.info({
      title: (<div className='detail-title'>Người đi du lịch</div>),
      content: ( <div className='detail-content'>
        Cho n thành phố đánh số từ 1 đến n và m tuyến đường giao thông hai chiều giữa chúng
        , mạng lưới giao thông này được cho bởi bảng C cấp nxn, ở đây
         C[i, j] = C[j, i] = Chi phí đi đoạn đường trực tiếp từ thành phố i đến thành phố j
        . Giả thiết rằng C[i, i] = 0 với ∀i, C[i, j] = +∞ (-1 khi nhập dữ liệu) nếu
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

  const onChangeNumberCity = useCallback(
    (value) => {
      const a = []
      const b = []
      for (let j = 0; j < value; j++) {
        b.push(0)
      }
      for (let i = 0; i < value; i++) {
        a.push(b)
      }
      setNumCity(value)
      setMatrix(a)
    }
  , [])

  const onChangeCity = useCallback((value, i, j) => {
    setMatrix(matrix.map((a, l) => a.map((b, k) =>
      (l === i && k === j) || (l === j && k === i) ? value : b
    )))
  }, [matrix])

  const onClickStart = useCallback(async () => {
    setDisable(true)
    let minPrice = 0
    const Try = async (i, price, lRes) => {
      const s = lRes.map((x, i) => i ? ` -> ${x + 1}` : x + 1).join('')
      if (lRes.length === numCity && matrix[i][0] > 0) {
        setRes(s)
        if (price < minPrice || !minPrice) {
          minPrice = price
          setResT({
            path: s,
            value: price
          })
        }
      } else {
        for(const [j, a] of matrix[i].entries()) {
          if (a > 0 && !lRes.some(x => x === j)) {
            if (branch && minPrice && price > minPrice) {
              setRes(`${s} X`)
              await sleep(time)
            } else {
              lRes.push(j)
              setRes(s)
              setPri(price + a)
              await sleep(time)
              await Try(j, price + a, lRes)
              lRes.pop()
            }
          }
        }
      }
    }
    await Try(0, 0, [0])
  }, [branch, matrix, numCity, time])

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
          max={7}
          onChange={value => onChangeNumberCity(value)}
          disabled={disable}
        />
      </div>
      <div className='input'>
          <label style={{ marginRight: 20 }} htmlFor='time'>
            Time (ms):
          </label>
          <InputNumber
            id='time'
            defaultValue={time}
            min={0}
            max={10000}
            onChange={value => setTime(value)}
            disabled={disable}
          />
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
      <div className='matrix-content'>
        {
          matrix.map((a, i) => (
            <div key={i} className='matrix-item'>
              {
                a.map((b, j) => (
                  <InputNumber
                    key={`${i}-${j}`}
                    className='city'
                    min={-1}
                    defaultValue={matrix[i][j]}
                    value={matrix[i][j]}
                    disabled={i === j || disable}
                    onChange={value => onChangeCity(value, i, j)}
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
      >
        Bắt đầu
      </Button>
      { disable &&
        (
          <>
            <div className='path'>
              <div>Đường đi</div>
              <div>Chi phí</div>
            </div>
            <div className='path'>
              {res}
              <div>{pri}</div>
            </div>
            <div className='path' style={{ flexDirection: 'column' }}>
              <div>Đường đi tối ưu: {resT.path}</div>
              <div>Chi phí thấp nhất: {resT.value}</div>
            </div>
          </>
        )
      }
    </>
  )
})

export default Traveler