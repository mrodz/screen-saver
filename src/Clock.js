import {
	memo,
	useCallback,
	useEffect,
	useRef,
	useState
} from "react"
import "./Clock.css"


/**
 * Single digit of a display.
 * @function
 * @param {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9} baseTenDigit the digit active.
 * @returns JSX
 */
const Digit = memo(({ baseTenDigit }) => {
	const delay = 200

	const [{ top, flip }, setState] = useState({ top: baseTenDigit, flip: baseTenDigit })
	const bottom = baseTenDigit // bottom is always same as prop
	const flipOnBottom = flip !== bottom // will show prev on bottom
	const isFlipping = top !== baseTenDigit || flip !== baseTenDigit

	useEffect(() => {
		const id = setTimeout(() => {
			const newState = flipOnBottom ? { flip: baseTenDigit } : { top: baseTenDigit }

			setState(state => ({ ...state, ...newState }))
		}, delay)

		return () => clearTimeout(id)
	}, [isFlipping, flipOnBottom, baseTenDigit])

	return (
		<>
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
})

const DIGIT_FLIP_DELAY = 150

/**
 * @callback rolloverFn
 * @returns {void}
 * 
 * @callback incrementFn
 * @returns {void}
 * 
 * @param {number} startAt the value this digit is initialized to
 * @param {number} limit the maximum value this digit can hold. Defaults to 10.
 * Surpassing this threshold is undefined behavior, albeit possible.
 * @param {rolloverFn} rolloverCb called when the digit overflows.
 * @returns {[number, incrementFn]}
 */
function useDigit(startAt, limit = 10, rolloverCb = undefined) {
	const oneLess = limit - 1

	if (startAt < 0 || startAt > oneLess)
		throw new Error(`digit must be 0-${oneLess}: found ${startAt}`)

	const [current, setCurrent] = useState(startAt)

	const incDelayId = useRef(undefined)

	/**
	 * Increment the digit. If it overflows, will wrap the value back to zero.
	 * @function
	 */
	const increment = useCallback(() => {
		setCurrent(current => {
			const inc = current + 1

			if (inc > oneLess) {
				incDelayId.current = setTimeout(() => {
					rolloverCb?.()
				}, DIGIT_FLIP_DELAY)
			}

			return inc % limit
		})
	}, [oneLess, limit, rolloverCb])

	useEffect(() => {
		return () => clearTimeout(incDelayId.current)
	}, [])

	return [current, increment]
}

/**
 * # Generate a constant format for this clock's dates.
 * 
 * @param {number | Date} hours the amount of hours to use. If passed a 
 * {@link Date} object, will override the following with the values of the date.
 * @param {number} minutes the minutes of this timestamp.
 * @param {number} seconds the seconds of this timestamp.
 */
function ClockTimeFormat(hours, minutes, seconds) {
	if (typeof hours === 'object' && 'getHours' in hours && 'getMinutes' in hours && 'getSeconds' in hours) {
		const date = hours
		hours = date.getHours()
		minutes = date.getMinutes()
		seconds = date.getSeconds()
		this.raw = date
	} else {
		this.raw = new Date()
	}

	const hours1 = Math.floor(hours / 10)
	this.hours = [hours1, hours - (hours1 * 10)]

	const minutes1 = Math.floor(minutes / 10)
	this.minutes = [minutes1, minutes - (minutes1 * 10)]

	const seconds1 = Math.floor(seconds / 10)
	this.seconds = [seconds1, seconds - (seconds1 * 10)]
}

/**
 * # hh:mm:ss
 * @returns a formatted string.
 */
ClockTimeFormat.prototype.toString = function () {
	return `${this.hours[0]}${this.hours[1]}:${this.minutes[0]}${this.minutes[1]}:${this.seconds[0]}${this.seconds[1]}`
}

export default function Clock() {
	const now = new Date()
	const pageLoad = useRef(new ClockTimeFormat(now))
	// const pageLoad = useRef(new ClockTimeFormat(23, 59, 56)) // manually set date

	const [hours1, incrementHours1] = useDigit(pageLoad.current.hours[0], 3)
	const [hours0, incrementHours0] = useDigit(pageLoad.current.hours[1], 10, incrementHours1)
	const [minutes1, incrementMinutes1] = useDigit(pageLoad.current.minutes[0], 6, incrementHours0)
	const [minutes0, incrementMinutes0] = useDigit(pageLoad.current.minutes[1], 10, incrementMinutes1)
	const [seconds1, incrementSeconds1] = useDigit(pageLoad.current.seconds[0], 6, incrementMinutes0)
	const [seconds0, incrementSeconds0] = useDigit(pageLoad.current.seconds[1], 10, incrementSeconds1)

	const updateClock = useCallback(() => {
		pageLoad.current = new ClockTimeFormat(new Date())
		incrementSeconds0()
	}, [incrementSeconds0])

	useEffect(() => {
		if (hours1 === 2 && hours0 === 4) {
			for (let i = 0; i < 6; i++) {
				incrementHours0() // reset on 24th-hour daily rollover
			}
		}
	}, [hours1, hours0, incrementHours0])

	useEffect(() => {
		const ms = pageLoad.current.raw.getMilliseconds()
		const nextUpdateTick = 1_000 - ms

		const timeoutId = setTimeout(() => { }, nextUpdateTick) // get caught up with the times.
		const intervalId = setInterval(updateClock, 1000 - DIGIT_FLIP_DELAY / 10)

		// in case of component dismount, kill timeouts.
		return () => {
			clearTimeout(timeoutId)
			clearInterval(intervalId)
		}
	}, [updateClock, pageLoad.raw])

	const Colon = memo(() => <span className="clock-colon subdued-font">:</span>)

	return (
		<>
			<div className="clock contrasting-font">
				<Digit baseTenDigit={hours1} />
				<Digit baseTenDigit={hours0} />

				<Colon />

				<Digit baseTenDigit={minutes1} />
				<Digit baseTenDigit={minutes0} />

				<Colon />

				<Digit baseTenDigit={seconds1} />
				<Digit baseTenDigit={seconds0} />
			</div>
		</>
	)
}
