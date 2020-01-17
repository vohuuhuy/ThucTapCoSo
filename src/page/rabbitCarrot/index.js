import React from 'react'
import { Form, Icon, Modal, InputNumber, Button, Checkbox } from 'antd'
import BackHome from '../backHome'
import './index.css'
import { sleep } from '../../common'
class RabbitCarrot extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      render: true,
      carrot: { x: 0, y: 0 },
      disable: false,
      branch: false,
      time: 0,
      result: [[2]]
    }
    this.map = [[2]]
  }
  modalDetail = () => {
    Modal.info({
      title: (<div className='detail-title'>Thỏ nhặt cà rốt</div>),
      content: (<div className='detail-content'>
        Cho một bản đồ số gồm số 1 và 0. số 1 là đường đi 0 là bờ (ko đi được) Con thỏ đang đứng ở vị trí 1,1
        . Cà rốt được đặt trong đường đi bản đồ
        . Chương trình kiểm tra thỏ có đến được vị trí cà rốt được không? Nếu được thì tìm số bước đi ít nhất để đến.
        </div>),
      okText: 'Đã hiểu'
    })
  }
  onChangeMap = ({ col, row }) => {
    const a = []
    const b = []
    for (let j = 0; j < col; j++) {
      b.push(0)
    }
    for (let i = 0; i < row; i++) {
      a.push(b)
    }
    this.map = a.map((row, i) => row.length ? row.map((col, j) => !i && !j ? 2 : col) : row)
    this.setState(prevState => {
      prevState.render = !prevState.render
      return prevState
    })
  }
  handleClickCell = (i, j) => {
    this.map = this.map.map((row, is) => row.length && row.map((col, js) => i === is && j === js ? !col ? 1 : 0 : col))
    this.setState(prevState => {
      prevState.render = !prevState.render
      return prevState
    })
  }
  countPath = async (end = false) => {
    const mapTmp = this.map
    let count = 0
    mapTmp.forEach((row, i) => row.forEach((col, j) => {
      if (col === 2 || col === 3) {
        count++
      }
    }))
    return { count, mapTmp }
  }
  onClickStart = async () => {
    const { carrot, time, branch } = this.state
    this.setState({ disable: true })
    const move = {
      top: { x: -1, y: 0 },
      right: { x: 0, y: 1 },
      bottom: { x: 1, y: 0 },
      left: { x: 0, y: -1 }
    }
    const keyMove = Object.keys(move)
    this.minCount = this.map.length * this.map[0].length
    const Try = async local => {
      const { count } = await this.countPath()
      if (local.x === carrot.x && local.y === carrot.y) {
        if (count <= this.minCount) {
          this.minCount = count
          this.setState(prevState => {
            return prevState
          })
        }
      } else {
        if (!branch || (branch && this.minCount >= count)) {
          for (const key of keyMove) {
            const exaX = local.x + move[key].x
            const exaY = local.y + move[key].y
            if (0 <= exaX && exaX < this.map.length && 0 <= exaY && exaY < this.map[0].length
              && this.map[exaX][exaY] === 0
            ) {
              await sleep(time)
              this.map[local.x][local.y] = 3
              this.map[exaX][exaY] = 2
              this.setState(prevState => {
                prevState.render = !prevState.render
                return prevState
              })
              await Try({ x: exaX, y: exaY })
              this.map[exaX][exaY] = 0
              this.map[local.x][local.y] = 2
            }
          }
        }
      }
    }
    await Try({ x: 0, y: 0})
  }

  render () {
    return (
      <>
        <BackHome history={this.props.history}/>
        <p className='header'>
          Thỏ nhặt cà rốt
          <Icon
            className='icon-detail'
            type='info-circle'
            onClick={this.modalDetail}
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
            onChange={value => this.onChangeMap({ row: value, col: this.map.length ? this.map[0].length : 1 })}
            autoFocus={false}
            disabled={this.state.disable}
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
            onChange={value => this.onChangeMap({ row: this.map.length ? this.map.length: 1, col: value })}
            autoFocus={false}
            disabled={this.state.disable}
          />
        </div>
        <div className='input'>
          <label style={{ marginRight: 20 }} htmlFor='time'>
            Time (ms):
          </label>
          <InputNumber
            id='time'
            defaultValue={this.state.time}
            min={0}
            max={10000}
            onChange={value => this.setState({ time: value })}
            disabled={this.state.disable}
          />
          <label style={{ marginLeft: 28, marginRight: 20 }} htmlFor='branch'>
            Nhánh cận:
          </label>
          <Checkbox
            id='branch'
            defaultValue={this.state.branch}
            onChange={value => this.setState({ branch: value.target.checked })}
            disabled={this.state.disable}
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
              max={this.map.length ? this.map[0].length - 1 : 0}
              onChange={value => this.setState(prevState => {
                prevState.carrot.x = value
                return prevState
              })}
              style={{ marginRight: 30 }}
              autoFocus={false}
              disabled={this.state.disable}
            />
            <label style={{ marginRight: 20 }} htmlFor='elementNumber4'>
              Y:
            </label>
            <InputNumber
              id='elementNumber4'
              defaultValue={0}
              min={0}
              max={this.map.length - 1}
              onChange={value => this.setState(prevState => {
                prevState.carrot.y = value
                return prevState
              })}
              autoFocus={false}
              disabled={this.state.disable}
            />
          </div>
        </div>
        <div className='map'>
          {
            this.map.map((row, i) => (
              <div className='row' key={i}>
                {
                  row.map((col, j) => (
                    <div
                      key={`${i}-${j}`}
                      className={`cell ${ col === 2 ? 'rabbit' : (i === this.state.carrot.y && j === this.state.carrot.x) ? 'carrot' : '' }`}
                      onClick={() => !(col === 2) && !(i === this.state.carrot.y && j === this.state.carrot.x) && !this.state.disable ? this.handleClickCell(i, j) : ''}
                      style={{ background: col === 1 ? '#516871' : col === 3 ? '#6fc754' :'white' }}
                    />
                  ))
                }
              </div>
            ))
          }
        </div>
        <Button
          onClick={this.onClickStart}
          disabled={this.state.disable}
          style={{ marginTop: 30 }}
        >
          Bắt đầu
        </Button>
        { this.state.disable && ( <p>{
          this.minCount !== this.map.length * this.map[0].length
          ? `Số bước đi ít nhất: ${this.minCount}`
          : 'Chưa có đường đi!'
        }</p> ) }
      </>
    )
  }
}

export default Form.create({ name: 'rabbit-carrot' })(RabbitCarrot)