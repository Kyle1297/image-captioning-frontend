type EnumType = { [s: number]: string };

export const getEnumEntries = (enumerable: EnumType): any[] => {
	// get all the members of the enum
	const entries: any[] = Object.entries(enumerable).map((entry) => ({
		label: entry[1],
		value: entry[0],
	}));
	return entries;
};
