import React from 'react'

const pad = (n, width, z='0') => {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const Counter = ({minutes, seconds}) => (
  <h2 className="text-center" id="counter">{pad(minutes,2)}:{pad(seconds,2)}</h2>
)

export default Counter;