import React from 'react'
import { Button } from 'antd'
import { Routers } from '../../common'
import './index.css'

export default function Home (props) {
  return (
    <div className='home'>
      <div className='header-home'>
        <div style={{ fontSize: 25, fontWeight: 600 }}>KHOA CÔNG NGHỆ THÔNG TIN</div>
        <div style={{ color: '#003d7d', fontSize: 15, fontWeight: 700 }}>
          Thực tập cơ sở
        </div>
      </div>
      {Routers.map((route, idx) => (
        <Button
          key={idx}
          className='home-button'
          onClick={() => props.history.push(`${route.router}`)}
        >
          { route.name }
        </Button>
      ))}
      <div>
        <Button
          style={{ color: 'rgb(75, 182, 226)', marginRight: 10 }}
          onClick={()=> window.open('https://docs.google.com/document/d/1ys9am7s_5lXFqE6rPFfFnOFgcxpyDxH1hd6kHtbmkg4/edit?usp=sharing', '_blank')}
        >Báo cáo</Button>
        <Button
          style={{ color: 'rgb(75, 182, 226)' }}
          onClick={()=> window.open('https://github.com/vohuuhuy/ThucTapCoSo', '_blank')}
        >Source Code</Button>
      </div>
    </div>
  )
}