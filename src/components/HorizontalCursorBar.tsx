import * as React from 'react'

export const HorizontalCursorBar = ({ barPosition }: { barPosition?: number }) => {
  return (
    <div
      style={{
        border: '1px solid black',
        width: '100%',
        height: 1,
        position: 'absolute',
        top: barPosition,
        transition: 'top 0.5s ease'
      }}
    />
  )
}
