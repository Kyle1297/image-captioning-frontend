import React, { Dispatch, SetStateAction } from 'react';
import {
	FormControl,
	RadioGroup,
	FormControlLabel,
	Radio,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import { ImagePost } from '../../../store/types/image';

interface Option {
	value: string | boolean;
	label: string;
	disabled?: boolean;
}

interface Props {
	setValue?: Dispatch<SetStateAction<string>>;
	setImage?: Dispatch<SetStateAction<ImagePost>>;
	value: string | ImagePost;
	options: Option[];
}

const RadioOptions: React.FC<Props> = ({
	setValue,
	setImage,
	value,
	options,
}) => {
	// retrieve styles
	const styles = useStyles();

	// set currently selected radio option value
	const handleOptions = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = (event.target as HTMLInputElement).value;
		if (setImage && typeof value !== 'string') {
			setImage({
				...value,
				is_private: newValue === 'true',
			});
		} else if (setValue) setValue(newValue);
	};

	return (
		<FormControl component='fieldset'>
			<RadioGroup
				row={setImage ? true : false}
				value={typeof value !== 'string' ? value.is_private : value}
				onChange={handleOptions}
			>
				{options.map((option, index) => (
					<FormControlLabel
						key={index}
						value={option.value}
						control={
							<Radio
								style={setImage ? {} : { marginRight: 7 }}
								classes={{
									root: styles.radio,
									checked: styles.checked,
								}}
							/>
						}
						label={option.label}
						classes={{
							label: styles.label,
						}}
						disabled={option.disabled}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		label: {
			fontSize: 15,
		},
		radio: {
			'&$checked': {
				color: blue[700],
			},
		},
		checked: {},
	})
);

export default RadioOptions;
