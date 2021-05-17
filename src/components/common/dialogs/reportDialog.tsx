import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
	Dialog,
	DialogActions,
	DialogContent,
	Button,
	Typography,
	useMediaQuery,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
	namedRequestError,
	namedRequestsInProgress,
} from '../../../store/selectors/request';
import { Request, RequestEnums } from '../../../store/types/request';
import { AppState } from '../../../store/reducers';
import RadioOptions from '../buttons/radioOptions';
import { grey } from '@material-ui/core/colors';
import { updateComment } from '../../../store/actions/comment';
import { updateImage } from '../../../store/actions/image';
import { AuthState } from '../../../store/types/auth';
import { Image, ImageReportTypes } from '../../../store/types/image';
import { Comment, CommentReportTypes } from '../../../store/types/comment';
import { setAlert } from '../../../store/actions/alert';
import { SeverityTypes } from '../../../store/types/alert';
import { getEnumEntries } from '../../utils/getEnumEntries';

interface Props {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	commentId?: Comment['id'];
	uuid?: Image['uuid'];
}

const ReportDialog: React.FC<Props> = ({ open, setOpen, commentId, uuid }) => {
	// retrieve styles and control dialog opening
	const styles = useStyles();
	const smallScreen = useMediaQuery('(max-width: 320px');
	const handleDialog = () => setOpen(false);

	// retrieve reporting states
	const [reportType, setReportType] = useState<string>('');
	const reportError = useSelector<AppState, Request['error']>((state) =>
		uuid
			? namedRequestError(state, RequestEnums.updateImage)
			: namedRequestError(state, RequestEnums.updateComment)
	);
	const isLoading = useSelector<AppState, Request['isLoading']>((state) =>
		uuid
			? namedRequestsInProgress(state, RequestEnums.updateImage)
			: namedRequestsInProgress(state, RequestEnums.updateComment)
	);

	// retrieve current user and check if identifier
	const user = useSelector<AppState, AuthState['user']>(
		(state) => state.auth.user
	);

	// send report
	const dispatch = useDispatch();
	const [reportClicked, setReportClicked] = useState<boolean>(false);
	const handleReport = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (user) {
			setReportClicked(true);
			const data = {
				report: {
					user: user.id,
					type: reportType,
				},
			};
			if (uuid) dispatch(updateImage(uuid, data));
			else if (commentId) dispatch(updateComment(commentId, data));
			setOpen(false);
		}
	};

	// handle reporting error and success
	useEffect(() => {
		if (reportClicked && !isLoading) {
			setReportClicked(false);
			if (reportError) {
				dispatch(
					setAlert({
						severity: SeverityTypes.ERROR,
						message: `There was an error while trying to report the ${
							uuid ? 'image' : 'comment'
						}. Please try again later.`,
						open: true,
						loading: null,
					})
				);
			} else {
				dispatch(
					setAlert({
						severity: SeverityTypes.SUCCESS,
						message: `The ${
							uuid ? 'image' : 'comment'
						} was successfully reported. Thank you.`,
						open: true,
						loading: null,
					})
				);
			}
		}
	}, [dispatch, uuid, reportError, reportClicked, isLoading]);

	return (
		<Dialog
			fullScreen={smallScreen ? true : false}
			open={open}
			fullWidth
			disableScrollLock
			onClose={handleDialog}
		>
			<DialogContent dividers>
				<Typography className={styles.title}>
					Report {uuid ? 'image' : 'comment'}
				</Typography>
				<RadioOptions
					options={getEnumEntries(uuid ? ImageReportTypes : CommentReportTypes)}
					value={reportType}
					setValue={setReportType}
				/>
				<div className={styles.info}>
					<Typography color='textSecondary' variant='caption'>
						Flagged {uuid ? 'images' : 'comments'} are reviewed by CaptionAI
						staff 24 hours a day, seven days a week.
					</Typography>
				</div>
			</DialogContent>
			<DialogActions className={styles.actions}>
				<Button onClick={handleDialog} className={styles.cancel}>
					Cancel
				</Button>
				<Button
					variant='contained'
					onClick={handleReport}
					className={styles.report}
					disabled={reportType ? false : true}
				>
					Report
				</Button>
			</DialogActions>
		</Dialog>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		title: {
			fontSize: 17,
			marginBottom: 5,
			marginTop: 3,
		},
		cancel: {
			color: grey[600],
			marginRight: 8,
		},
		report: {
			marginRight: 10,
		},
		info: {
			color: grey[500],
			marginTop: 17,
			marginBottom: 10,
			textAlign: 'center',
		},
		actions: {
			marginBottom: 5,
			marginTop: 5,
		},
	})
);

export default ReportDialog;
