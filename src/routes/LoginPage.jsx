import React, { useEffect } from "react";
import Box from '@mui/material/Box';
import GoogleLogin from 'react-google-login';
import { useNavigate } from "react-router-dom";

import { Grid, Typography, Card, Button } from '@mui/material';
import { makeStyles } from "@mui/styles";

import { getAuth, signInWithRedirect, GoogleAuthProvider, getRedirectResult, onAuthStateChanged } from "firebase/auth";

import firebaseConfig from '../app/firebaseConfig';
import { useDispatch } from "react-redux";


const useStyles = makeStyles({
	root: {
		background: "linear-gradient(45deg, #fe5713 15%, #50E3C2 90%)",
		minWidth: "100%",
		minHeight: "100vh",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center"
	},
	card: {
		maxWidth: "80%",
		minHeight: "20vh",
		display: "flex",
		alignItems: "center",
		backgroundColor: 'transparent !important',
		boxShadow: 'none !important'
	}
});


export default function LoginPage() {
	const navigate = useNavigate();
	const classes = useStyles();

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
    
    const handleGoogleSignIn = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithRedirect(auth, provider);
    }

	return (
		<>
			<Grid
				className={classes.root}
				spacing={0}
				alignItems="center"
				justify="center"
			>
				<Card className={classes.card}>
					<Box sx={{ width: '100%', margin: 'auto', align: 'center' }}>
						<Typography variant="h2" component="div" gutterBottom sx={{ fontWeight: '600', color:'#fff', background: 'transparent !important' }}>
							Welcome to ZestCafe
						</Typography>
						<div align="center">
							{/* <GoogleLogin
								clientId='343449356788-qpnf9bsa8a1pllj0nm8dgacq3mogepab.apps.googleusercontent.com'
								buttonText="Login with Google"
								// onSuccess={responseGoogle}
								cookiePolicy={'single_host_origin'}
							/> */}
                            {/* <Button onClick={handleGoogleSignIn}>Sign in via GOOGLE</Button> */}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={handleGoogleSignIn}
                                >
                                <img
                                    width="20px"
                                    style={{ marginBottom: "3px", marginRight: "5px" }}
                                    alt="Google sign-in"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                                />
                                Login with Google
                                </Button>
                                
						</div>
					</Box>
				</Card>
			</Grid>
		</>
	);
}