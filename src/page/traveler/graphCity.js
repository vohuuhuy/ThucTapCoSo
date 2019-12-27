import React from 'react'
import { Graph, DefaultLink, DefaultNode } from '@vx/network'

const nodes = [
  { x: 50, y: 20 },
  { x: 200, y: 300 },
  { x: 300, y: 40 }
]
const links = [
  { source: nodes[0], target: nodes[1] },
  { source: nodes[1] },
  { source: nodes[2] }
]

const graph = {
  nodes,
  links
}

const GraphCity = ({ width, height }) => {
  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} rx={14} fill="#24d" color='red'/>
      <Graph graph={graph} linkComponent={DefaultLink} nodeComponent={DefaultNode} />
    </svg>
  )
}

export default GraphCity