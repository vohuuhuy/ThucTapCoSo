import React from 'react'
import BackHome from '../backHome'

export default function Traveler (props) {
  return (
    <div>
      <BackHome history={props.history}/>
      <div>Traveler</div>
    </div>
  )
}