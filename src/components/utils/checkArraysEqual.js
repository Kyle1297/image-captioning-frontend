// check if two arrays have the same members, regardless of order
const checkArraysEqual = (firstArray, secondArray) => {
	const superSet = {};
	for (const index of firstArray) {
		const item = index + typeof index;
		superSet[item] = 1;
	}

	for (const index of secondArray) {
		const item = index + typeof index;
		if (!superSet[item]) {
			return false;
		}
		superSet[item] = 2;
	}

	for (let item in superSet) {
		if (superSet[item] === 1) {
			return false;
		}
	}

	return true;
};

export default checkArraysEqual;
