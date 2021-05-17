export const extractDateFormat = (timestamp: string, short?: boolean) => {
	// set days and months
	const WeekDays = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	const Months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	// set readable date format
	const date = new Date(timestamp);
	const minute = date.getMinutes();
	const hour = date.getHours();
	const weekDay = WeekDays[date.getDay()];
	const monthDay = date.getDate();
	const month = Months[date.getMonth()];
	const year = date.getFullYear();

	if (short) return `${monthDay} ${month} ${year}`;
	return `${weekDay}, ${monthDay} ${month} ${year} at ${hour}:${
		JSON.stringify(minute) === '0' ? '00' : minute
	}`;
};
