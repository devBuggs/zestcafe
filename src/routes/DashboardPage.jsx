// import React, { useEffect } from 'react';
// import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from "react-redux";
// import { Card, Container } from '@mui/material';

// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import Stack from '@mui/material/Stack';
// import { styled } from '@mui/material/styles';

// import CardMedia from '@mui/material/CardMedia';
// import Box from '@mui/material/Box';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

// import AppBar from '../components/Dashboard/Appbar';
// import TimerComponent from '../components/Dashboard/TimerComponent';

// const tea = React.lazy(() => import('../assets/images/tea 2.png'));
// const coffee = React.lazy(() => import('../assets/images/coffee (1).png'));
// const logo = React.lazy(() => import('../assets/images/logo.png'));
// const greentea = React.lazy(() => import('../assets/images/green-tea.png'));

// const DashboardPage = () => {
//     const auth = getAuth();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const currentUser = auth.currentUser;

//     const handleSignOut = () => {
//         signOut(auth).then(() => {
//             // Sign-out successful.
//             console.log("Signed out SUCCESSFUL...")
//             navigate('/')
//         }).catch((error) => {
//             // An error happened.
//             console.log("Sign out FAILED!", error);
//         });
//     }

//     useEffect(() => {
//         onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 // User is signed in, see docs for a list of available properties
//                 // https://firebase.google.com/docs/reference/js/firebase.User
//                 console.log("Firebase auth user :: ", user)
//                 const uid = user.uid;
//                 console.log("User Logged in...... navigating to dashboard")
//                 // ...
//                 navigate('/dashboard')
//             } else {
//                 // User is signed out
//                 // ...
//                 console.log("User Logged out......")
//                 navigate('/')
//             }
//         });

//     }, [auth, dispatch]);

//     // CONSOLE
//     console.log("currentUser => ", currentUser)
//     return (
//         <>
//             <AppBar logoutFunction={handleSignOut} />
//             <h3>Welcome to {currentUser?.displayName}!</h3>
//             <button onClick={handleSignOut}>Sign Out</button>

//             <hr />

//             <Container disableGutters >
//                 <Grid container spacing={1}>
//                     <Stack disableGutters
//                         direction={{ xs: 'column', sm: 'row' }}
//                         spacing={3}
//                     >
//                         <Card sx={{ maxWidth: 250, backgroundColor: 'aqua' }}>
//                         <CardMedia
//                             component="img"
//                             height="140"
//                             image={tea}
//                             alt="tea image missing"
//                             />
//                             {/* <img src={tea} alt="tea logo missing" height="140" /> */}
//                             <CardContent>
//                                 <Typography gutterBottom variant="h5" component="div">
//                                     TEA
//                                 </Typography>
//                             </CardContent>
//                             <CardActions>
//                                 <Button size="small">Share</Button>
//                             </CardActions>
//                         </Card>

//                         <Card sx={{ maxWidth: 250, backgroundColor: 'aquamarine' }}>
//                             <CardMedia
//                                 component="img"
//                                 height="140"
//                                 image={coffee}
//                                 alt="green iguana"
//                             />
//                             <CardContent>
//                                 <Typography gutterBottom variant="h5" component="div">
//                                     COFFEE
//                                 </Typography>
//                             </CardContent>
//                             <CardActions>
//                                 <Button size="small">Share</Button>
//                             </CardActions>
//                         </Card>

//                         <Card sx={{ maxWidth: 250, backgroundColor: 'seagreen' }}>
//                             <CardMedia
//                                 component="img"
//                                 height="140"
//                                 image={greentea}
//                                 alt="green iguana"
//                             />
//                             <CardContent>
//                                 <Typography gutterBottom variant="h5" component="div">
//                                     GREENTEA
//                                 </Typography>
//                             </CardContent>
//                             <CardActions>
//                                 <Button size="small">Share</Button>
//                             </CardActions>
//                         </Card>

//                     </Stack>
//                 </Grid>
//             </Container>

//         </>
//     )
// }
// export default DashboardPage;

// const bull = (
//     <Box
//         component="span"
//         sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//     >
//         •
//     </Box>
// );

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CustomButton from "../commonComponents/button/Button";
import { makeStyles } from "@mui/styles";
// import "../App.css";
import tea from "../assets/images/tea 2.png";
import coffee from "../assets/images/coffee (1).png";
import logo from "../assets/images/logo.png";
import greentea from "../assets/images/green-tea.png";
import Profile from "../components/Dashboard/Profile";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import firebase from "../app/firebaseConfig";
import { useLocation, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { getAuth, signOut } from "firebase/auth";
import { Button } from "@mui/material";

import TimerComponent from '../components/Dashboard/TimerComponent';


const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

const useStyle = makeStyles(() => ({
	CardBox: {
		display: "flex",
		justifyContent: "center",
		width: "100%",
		height: "200px",
		borderRadius: "10px",
		marginTop: "20px",
		// [theme.breakpoints.down("md")]: {
		//   backgroundColor: "red",
		//   border: "2px red solid",
		// },
	},
	heading: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},
	profile: {
		marginRight: "30px",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "300px",
		alignItems: "center",
	},
	button: {
		width: "20px",
		height: "20px",
	},
	logo: {
		width: "200px",
		height: "100px",
	},
	Slider: {
		width: "100%",
		height: "500px",
		marginTop: "0px !important",
	},
	selectContainer: {
		marginTop: "50px",
		textAlign: "center,",
	},
	modalBox: {
		width: "300px",
	},
}));

const Dashboard = () => {
	const useLocationValue = useLocation();
	const classes = useStyle();
	console.log(createTheme.theme, "dsdsadasdsdsada");

	const [user, setUser] = useState();

	const auth = getAuth();
	const currentUser = auth.currentUser;
	console.log("CurrentUser => ", currentUser);

	console.log(user, "users list");
	const baseURL = "https://zestcafe-4edf3-default-rtdb.asia-southeast1.firebasedatabase.app/zestgeekDatabase.json";
	const zestgeekUser = firebase.database().ref("zestgeekDatabase");

	// google user image
	const givenName = currentUser?.displayName;
	console.log(givenName, "google givenName");
	const imageUrl = currentUser?.photoURL;
	
	// const googleId = useLocationValue?.state?.googleId;
	const googleId = currentUser?.uid;

	console.log("Google UID :: ", googleId)

	const getUserDetails = () => {
		axios.get(baseURL).then((response) => {
			const responseData = response.data;
			console.log(responseData, "responseDataresponseData");
			var userList = [];
			for (var key in responseData) {
				userList.push(responseData[key]);
			}
			setUser(userList);
		});
	};

	const navigate = useNavigate();

	const handleSignOut = (e) => {
		e.preventDefault();
		signOut(auth)
			.then(() => {
				// Sign-out successful.
				navigate("/");
			})
			.catch((error) => {
				// An error happened.
				console.log("Signout Error....", error);
			});
	};

	console.log(user, "akjdjasbdjhasb1111111111111111");
	useEffect(() => {
		getUserDetails();
	}, []);



	const date = new Date();
	const hours = date.getHours();
	const [timer, setTimer] = useState(true);
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);
	
	useEffect(() => {
		if (hours === 15 ) {
			setTimer(true);
		} else {
			setTimer(true ? hours === 17 : "false");
		}
		
	}, [date]);

	const handleClick = (e) => {
		const buttonType = e.target.name;
		const filterUser = user.find((item) => item.givenName === givenName);
		const ButtonFilterName = user.find((item) => item.name === buttonType);
		if (!filterUser) {
			updateDB(buttonType, givenName, imageUrl, googleId);
		}
		if (!ButtonFilterName || filterUser) {
			updateDB(buttonType, givenName, imageUrl, googleId);
		}
	};
	const updateDB = (type, givenName, imageUrl, googleId) => {
		zestgeekUser
			.child(googleId)
			.update({
				googleId: googleId,
				name: type,
				givenName: givenName,
				imageUrl: imageUrl,
			})
			.then(() => {
				getUserDetails();
			});
	};

	return (
		<Box
			className="body"
			sx={{
				display: "flex",
				flexDirection: "column",
				width: "100%",
				height: "auto",
				minHeight: "900px",
				alignItem: "center",
				backgroundColor: "#fff",
			}}
		>
			<Box className={classes.heading}>
				<img className={classes.logo} src={logo} alt="logo"></img>
				<Box className={classes.profile}>
					<Profile imageUrl={imageUrl} />	
					<Button onClick={handleSignOut}>Logout</Button>
				</Box>
			</Box>
			<Box className={classes.selectContainer}>
				<Box sx={{ textAlign: "center" }}>
					<Typography variant="h3" gutterBottom component="div">
						Choose your cup {currentUser?.displayName ? currentUser?.displayName : "null"}
					</Typography>
					<Typography variant="h5" gutterBottom component="div">
						{ timer ? (
							<></>
						) : (
							<Modal
								open={true}
								onClose={handleClose}
								aria-labelledby="modal-modal-title"
								aria-describedby="modal-modal-description"
								className="modalBox"
							>
								<Box sx={style}>
									<Typography
										id="modal-modal-title"
										variant="h6"
										component="h2"
									>
										You are late...
									</Typography>
									<Typography id="modal-modal-description" sx={{ mt: 2 }}>
										Will available soon ...
									</Typography>
								</Box>
							</Modal>
						)}
					</Typography>
				</Box>
				<Box
					className={classes.CardBox}
					sx={{
						flexDirection: ["column", "row"],
						justifyContent: ["end", null, null],
						alignItem: ["start", null],
						marginTop: ["200px", null, null],
					}}
				>
					<CustomButton
						image={tea}
						buttonName="Tea"
						onClick={handleClick}
						user={user}
						givenName={givenName}
					/>
					<CustomButton
						image={coffee}
						buttonName="Coffee"
						onClick={handleClick}
						user={user}
						givenName={givenName}
					/>
					<CustomButton
						image={greentea}
						buttonName="greentea"
						onClick={handleClick}
						user={user}
						givenName={givenName}
					/>
				</Box>
			</Box>
			{/* <TimerComponent/> */}
		</Box>
	);
};

export default Dashboard;
