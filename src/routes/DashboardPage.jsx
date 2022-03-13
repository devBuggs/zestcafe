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
import { useLocation } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { getAuth } from "firebase/auth";

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
		height: [600,200],
		borderRadius: "10px",
		marginTop: "20px",
		alignItems:'center'
	},
	heading: {
		display: "flex",
		justifyContent:"space-between",
		alignItems: "center",
	},
	profile: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-evenly",
		width: "200px",
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
	useEffect(() => {
		getUserDetails();
	}, []);
	const date = new Date();
	const hours = date.getHours();
	console.log(hours,"hours")
	const [timer, setTimer] = useState(true);
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);
	
	useEffect(() => {
		if (hours >=8 && hours <=11  ) {
			setTimer(true);
		} else {
			setTimer(true ? hours >=15 && hours<=17 : "false");
		}	
	}, [hours]);

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
		</Box>
	);
};

export default Dashboard;
