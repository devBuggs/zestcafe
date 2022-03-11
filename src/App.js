import React, { useEffect, Suspense } from 'react';
import {
	Routes,
	Route,
	useNavigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./app/firebaseConfig";

import Loader from './commonComponents/Loader';

const LoginPage = React.lazy(() => import('./routes/LoginPage.jsx'));
const DashboardPage = React.lazy(() => import('./routes/DashboardPage.jsx'));



function App() {

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const auth = getAuth();

	useEffect(() => {

		onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				console.log("Firebase auth user :: ", user)
				const uid = user.uid;
				console.log("User Logged in...... navigating to dashboard")
				// ...
				navigate('/dashboard')
			} else {
				// User is signed out
				// ...
				console.log("User Logged out......")
				navigate('/')
			}
		});

	}, [auth, dispatch]);



	return (
		<>
			<Suspense fallback={ <Loader/> }>
				<Routes>
					<Route exact path="/" element={<LoginPage />} />
					<Route exact path="/dashboard" element={<DashboardPage />} />
				</Routes>
			</Suspense>
		</>
	);
}

export default App;
