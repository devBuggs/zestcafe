import React, {useEffect } from 'react';
import { getAuth, signOut , onAuthStateChanged} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { Container } from '@mui/material';

const DashboardPage = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const currentUser = auth.currentUser;

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Signed out SUCCESSFUL...")
            navigate('/')
        }).catch((error) => {
            // An error happened.
            console.log("Sign out FAILED!", error);
        });
    }

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
    


    // CONSOLE
    console.log("currentUser => ", currentUser)
    return (
        <>
            <h3>Welcome to { currentUser.displayName }!</h3>
            <button onClick={handleSignOut}>Sign Out</button>


            <hr />

            <Container disableGutters >
                
            </Container>

        </>
    )
}
export default DashboardPage;




