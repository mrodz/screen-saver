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

function useDigit(startAt, limit = 10, rolloverCb = undefined) {
  const oneLess = limit - 1

  if (startAt < 0 || startAt > oneLess)
    throw new Error(`digit must be 0-${oneLess}: found ${startAt}`)

  const [current, setCurrent] = useState(startAt)

  const increment = () => {
    setCurrent(current => {
      const inc = current + 1

      if (inc > oneLess) rolloverCb?.()

      return inc % limit
    })
  }

  return [current, increment]
}

export default function Clock() {
  const [time, setTime] = useState(new Date())

  const [minutes0, incrementMinutes0] = useDigit(0, 10)
  const [seconds1, incrementSeconds1] = useDigit(5, 6, incrementMinutes0)
  const [seconds0, incrementSeconds0] = useDigit(0, 10, incrementSeconds1)


  const updateClock = () => {
    // setTime(new Date())
    incrementSeconds0()
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

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Digit baseTenDigit={minutes0} />
        <Digit baseTenDigit={seconds1} />
        <Digit baseTenDigit={seconds0} />
      </div>

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
