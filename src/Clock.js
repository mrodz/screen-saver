import { useEffect, useRef, useState } from "react"
import "./Clock.css"

function Digit({ baseTenDigit }) {
	const delay = 150

	const topPrev = useRef(null)
	const topNext = useRef(null)
	const bottom = useRef(null)

	// debugger;

	useEffect(() => {
		// bottom.current.setAttribute('style', 'transition: rotateX(-90deg) .15s')
		// bottom.style = 
		topPrev.current?.removeAttribute?.("data-hide")
		topNext.current?.removeAttribute?.("data-show")
		bottom.current.classList.toggle("animate-forward")
		// bottom.current.classList.toggle("animate-forward")

		// setTimeout(() => {
		// 	bottom.current.classList.toggle("animate-forward")
		// }, 0)
		// debugger;

		const id = setTimeout(() => {
			topPrev.current?.setAttribute?.("data-hide", true)
			topNext.current.setAttribute("data-show", true)
		}, delay)

		return () => clearTimeout(id)
	}, [baseTenDigit])

	const next = (baseTenDigit + 1) % 10

	return (
		<div className="digit">
			<div className="digit-card" data-top data-prev ref={topPrev}>{baseTenDigit}</div>
			<div className="digit-card" data-bottom data-prev ref={bottom}>{baseTenDigit}</div>

			<div className="digit-card" data-top data-current ref={topNext}>{next}</div>
			<div className="digit-card" data-bottom data-current>{next}</div>
		</div>
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
	const [time, setTime] = useState(new Date());
	const [seconds, incrementSeconds] = useDigit(0);

	const updateClock = () => {
		setTime(new Date())
		// incrementSeconds()
		// setTime((time) => (time ?? 0) + 1)
	}

	useEffect(() => {
		const onPageLoad = new Date()

		const ms = onPageLoad.getMilliseconds()
		const nextUpdateTick = 1_000 - ms

		const timeoutId = setTimeout(() => { }, nextUpdateTick);

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

			<button onClick={() => incrementSeconds()}>+++++</button>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />

		</>
	)
}