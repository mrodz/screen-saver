import { useEffect, useRef, useState } from "react"
import "./Clock.css"

function Digit(baseTenDigit) {
	const [digit, incrementDigit] = useDigit(baseTenDigit);

	const delay = 200

	const topPrev = useRef(null)
	const topNext = useRef(null)

	useEffect(() => {
		const id = setTimeout(() => {
			topPrev.current.setAttribute("data-hide", true)
			topNext.current.setAttribute("data-show", true)
		}, delay)

		return () => clearTimeout(id)
	}, [])

	return (
		<div className="digit">
			<div className="digit-card" data-top data-prev ref={topPrev}>1</div>
			<div className="digit-card" data-bottom data-prev>1</div>

			<div className="digit-card" data-top data-current ref={topNext}>8</div>
			<div className="digit-card" data-bottom data-current>8</div>
			{/* <div className="digit-card" data-next>2</div> */}
			{/* <div className="digit-card" data-three>3</div>
			<div className="digit-card" data-four>4</div>
			<div className="digit-card" data-five>5</div>
			<div className="digit-card" data-six>6</div>
			<div className="digit-card" data-seven>7</div>
			<div className="digit-card" data-eight>8</div>
			<div className="digit-card" data-nine>9</div> */}
		</div>
	)
}

function useDigit(startAt) {
	if (startAt < 0 || startAt > 9)
		throw new Error(`digit must be 0-9: found ${startAt}`)

	const [current, setCurrent] = useState(startAt)

	const increment = () => {
		setCurrent(current => {
			if (current == 9) {
				return 0
			}

			return current + 1
		})
	}

	return [current, increment]
}

export default function Clock() {
	const [time, setTime] = useState(new Date());

	const updateClock = () => {
		setTime(new Date())
		// setTime((time) => (time ?? 0) + 1)
	}

	useEffect(() => {
		const onPageLoad = new Date()

		const ms = onPageLoad.getMilliseconds()
		const nextUpdateTick = 1_000 - ms

		setTimeout(() => { }, nextUpdateTick);

		const intervalId = setInterval(updateClock, 1_000)

		return () => clearInterval(intervalId)
	}, [])

	return (
		<>
			{JSON.stringify(time) ?? 'no time'}

			<Digit baseTenDigit={0} />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />

		</>
	)
}