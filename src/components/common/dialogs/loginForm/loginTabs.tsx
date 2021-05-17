import React, { Fragment } from 'react';
import { Tabs, Tab, Divider } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginTab } from '../../../../store/actions/login';
import { AppState } from '../../../../store/reducers';
import { LoginState } from '../../../../store/types/login';

const LoginTabs: React.FC = () => {
	// control styles
	const styles = useStyles();

	// retrieve login tab
	const tab = useSelector<AppState, LoginState['tab']>(
		(state) => state.login.tab
	);

	// switch login tab
	const dispatch = useDispatch();
	const handleTabs = (event: React.ChangeEvent<{}>, value: number) => {
		dispatch(setLoginTab(value));
	};

	return (
		<Fragment>
			<Tabs
				centered
				value={tab}
				indicatorColor='primary'
				textColor='primary'
				onChange={handleTabs}
			>
				<Tab label='Login' />
				<Tab label='Join' />
			</Tabs>
			<Divider classes={{ root: styles.divider }} />
		</Fragment>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		divider: {
			width: '100%',
			margin: 'auto',
		},
	})
);

export default LoginTabs;
