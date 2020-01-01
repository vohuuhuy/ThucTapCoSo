import React, { useState } from 'react'
import { InputNumber, Button, Icon, Modal } from 'antd'
import { sleep } from '../../common'
import BackHome from '../backHome'  

function ExpressionZero (props) {
  const [element, setElement] = useState([])
  const [disInput, setDisInput] = useState(false)
  const [opera, setOpera] = useState([])
  const [outRes, setOutRes] = useState([])
  const [time, setTime] = useState(0)

  const handleChangeElementNumber = value => {
    const array = new Array(value).fill(0)
    setElement(array)
  }

  const runAlogrithm = () => {
    const size = element.length
    let operation = new Array(element.length).fill('+')
    const recursive = async (i, sum) => {
      if (i === size) {
        if (!sum) {
          await sleep(time)
          const res = outRes
          res.push(operation)
          setOutRes(res)
        }
      } else {
        for (let j = 0; j<= 1; j++) {
          if ((j === 0 && operation[i] === '-') || (j === 1 && operation[i] === '+')) {
            await sleep(time)
          }
          operation = operation.map((ope, idx) => idx === i ? (!j ? '+' : '-') : ope)
          setOpera(operation)
          if (!j) {
            await recursive(i+1, sum + element[i])
          } else {
            await recursive(i+1, sum - element[i])
          }
        }
        opera[i] = '+'
      }
    }
    recursive(0, 0)
  }

  const handleStart = () => {
    if (element.some(ele => !ele)) {
      Modal.warning({
        title: 'Chú ý!',
        content: 'Bạn nên nhập giá trị các phần tử khác 0.',
        okText: 'Đã hiểu'
      })
    } else {
      setDisInput(!disInput)
      runAlogrithm()
    }
  }

  const conSum = () => {
    let sum = 0
    element.forEach((ele, idx) => sum += opera[idx] === '+' ? ele : - ele)
    return sum.toString()
  }

  const modalDetail = () => {
    Modal.info({
      title: (<div className='detail-title'>Biểu thức zero</div>),
      content: (<div className='detail-content'>Cho một số tự nhiên N ≤ 9
        , giữa các số từ 1 đến N hãy thêm vào các dấu + hoặc –
         hoặc không thêm dấu sao cho kết quả thu được bằng 0.
        </div>),
      okText: 'Đã hiểu'
    })
  }

  return (
    <>
      <BackHome history={props.history}/>
      <div>
        <p className='header'>
          Biểu thức zero
          <Icon
            className='icon-detail'
            type='info-circle'
            onClick={modalDetail} 
          />
        </p>
        <div className='input'>
          <label style={{ marginRight: 20 }} htmlFor='elementNumber'>
            Nhập số lượng phần tử:
          </label>
          <InputNumber
            id='elementNumber'
            defaultValue={0}
            min={0}
            max={9}
            onChange={value => handleChangeElementNumber(value)}
            disabled={disInput}
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
            disabled={disInput}
          />
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', fontSize: 20,
          justifyItems: 'space-between', justifyContent: 'space-evenly'
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyItems: 'center',
            justifyContent: 'space-evenly'
          }}>
            {element.map((ele, idx) => (
              <>
                <div style={{ width: 22 }}>
                  {
                    disInput ? opera[idx] : ''
                  }
                </div>
                <InputNumber
                  style={{ boxSizing: 'border-box', marginRight: 5 }}
                  defaultValue={ele}
                  value={ele}
                  key={idx}
                  disabled={disInput}
                  onChange={value => setElement(element.map((ele, i) =>
                    i === idx ? value : ele
                  ))}
                />
              </>
            ))}
          </div>
          <div>
            {
              disInput ? ` = ${conSum()}` : ''
            }
          </div>
        </div>
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          {
            element.length > 1
            ? (
              <Button
                onClick={handleStart}
                disabled={disInput}
              >
                Bắt đầu
              </Button>
            )
            : <></>
          }
        </div>
        <div style={{ fontSize: 20 }}>
          {
            outRes.map((res, idx) => {
              let string  = ''
              element.forEach((ele, idx) =>
                string += ` ${res[idx]} ${ele}`
              )
              let sum = 0
              element.forEach((ele, i) => sum += outRes[idx][i] === '+' ? ele : - ele)
              string += ` = ${sum}`
              return (
                <div key={idx}>{string}</div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default ExpressionZero