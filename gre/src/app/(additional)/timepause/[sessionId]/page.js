import TimeBreak from '@/components/TimePause'
import React from 'react'

const TimePause = ({sessionId}) => {
  return (
    <TimeBreak redirectTo={`/insrtructions/${sessionId}`} />
  )
}

export default TimePause