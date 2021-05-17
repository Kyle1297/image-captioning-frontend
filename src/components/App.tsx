import React, { useEffect } from 'react';
import Home from './pages/home';
import { Provider } from 'react-redux';
import store from '../store';
import './styles.css';
import { getUser } from '../store/actions/auth';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ImageDetails from './pages/imageDetails';
import AlertMessage from './common/layout/alertMessage';
import LoginForm from './common/dialogs/loginForm';
import Explore from './pages/explore';
import ErrorPage from './pages/errorPage';
import Profile from './pages/accounts/profile';
import Account from './pages/accounts/account';
import PrivateRouter from './utils/privateRouter';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import NavBar from './common/layout/navBar';
import BottomNavBar from './common/layout/footer';

const App: React.FC = () => {
	// access styles
	const styles = useStyles();

	// check for authenticated user
	useEffect(() => {
		store.dispatch<any>(getUser());
	});

	return (
		<Provider store={store}>
			<Router>
				<Grid
					className={styles.root}
					container
					justify='space-between'
					direction='column'
				>
					<Grid item xs>
						<NavBar />
						<div className={styles.children}>
							<Switch>
								<Route exact path='/' component={Home} />
								<Route exact path='/images/:uuid' component={ImageDetails} />
								<Route exact path='/explore/:collection?' component={Explore} />
								<Route exact path='/users/:username' component={Profile} />
								<PrivateRouter exact path='/account' Component={Account} />
								<Route component={ErrorPage} />
							</Switch>
						</div>
					</Grid>
					<Grid item>
						<BottomNavBar />
					</Grid>
				</Grid>
				<AlertMessage />
				<LoginForm />
			</Router>
		</Provider>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			minHeight: '100vh',
		},
		children: {
			marginTop: 85,
		},
	})
);

export default App;
