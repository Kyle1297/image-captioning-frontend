const getSkeletonArray = (width: number) => {
	let number = Math.floor(width / 400);
	if (!number) number = 1;
	return Array.from(new Array(number));
};

export default getSkeletonArray;
