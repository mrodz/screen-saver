import { useEffect, useState } from "react"
import "./Clock.css"

function Digit({ baseTenDigit }) {
  const delay = 200

  const [{ top, flip }, setState] = useState({ top: baseTenDigit, flip: baseTenDigit })
  const bottom = baseTenDigit // bottom is always same as prop
  const flipOnBottom = flip != bottom // will show prev on bottom
  const isFlipping = top != baseTenDigit || flip != baseTenDigit

  useEffect(() => {
    // if (!isFlipping) return

    const id = setTimeout(() => {
      const newState = flipOnBottom ? { flip: baseTenDigit } : { top: baseTenDigit }

      setState(state => ({ ...state, ...newState }))
    }, delay)

    return () => clearTimeout(id)
  }, [isFlipping, flipOnBottom])

  return (
    <>
      <br /><br /><br />
      <div className="digit">
        <div className="digit-card top">
          {top}
        </div>
        <div className="digit-card bottom">
          {bottom}
        </div>

        {isFlipping && <div className={"digit-card flip " + (flipOnBottom ? "bottom" : "top")}>
          {flip}
        </div>}
      </div>
    </>
  )
}

function useDigit(startAt) {
  if (startAt < 0 || startAt > 9)
    throw new Error(`digit must be 0-9: found ${startAt}`)

  const [current, setCurrent] = useState(startAt)

  const increment = () => {
    setCurrent(current => {
      return (current + 1) % 10
    })
  }

  return [current, increment]
}

export default function Clock() {
  const [time, setTime] = useState(new Date())
  const [seconds, incrementSeconds] = useDigit(0)

  const updateClock = () => {
    // setTime(new Date())
    incrementSeconds()
    // setTime((time) => (time ?? 0) + 1)
  }

  useEffect(() => {
    const onPageLoad = new Date()

    const ms = onPageLoad.getMilliseconds()
    const nextUpdateTick = 1_000 - ms

    const timeoutId = setTimeout(() => { }, nextUpdateTick)

    const intervalId = setInterval(updateClock, 1_000)

    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [])

  return (
    <>
      {JSON.stringify(time) ?? 'no time'}

      <Digit baseTenDigit={seconds} />

      {/* <button onClick={() => incrementSeconds()}>+++++</button> */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

    </>
  )
}
