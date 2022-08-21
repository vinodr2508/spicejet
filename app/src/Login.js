import * as React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Button, TextField, Grid, Typography} from "@mui/material";


/**
 * Style Setup for container
 **/
const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #ccc',
    boxShadow: 24,
    p: 4,
    maxWidth: 800,
    margin: "50px auto"
};
const error = {
    color: '#F00F00',
}

/**
 * Component Name: Login Component
 * Description: Loaded Login Screen and Redirect to Dashboard once Logged In
 * Parameters: No Parameters
 **/
export default function Login() {
    const navigate = useNavigate();

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const users = [{username: "spicejet", password: "123"}, {username: "vinod", password: "dev"}, {
        username: "test",
        password: "test123"
    }];
    const handleSubmit = (e) => {
        e.preventDefault();
        const account = users.find((user) => user.username === username);
        if (account && account.password === password) {
            localStorage.setItem("username", username);
            localStorage.setItem("authenticated", true);
            navigate("/dashboard");
        } else {
            setErrorMessage(`Invalid Username/Password.`);
            return false;
        }
    };
    return (
        <>
            <Box sx={style}>
                <Typography id="modal-modal-description">
                    <h2>Login</h2>
                      <Box component="form" onSubmit={handleSubmit}>
                        <Grid item p={1}>
                            <TextField fullWidth
                                       label={"Username"} //optional
                                       onChange={(e) => setUserName(e.target.value)}
                                       name="Username"
                                       r value={username}
                            />
                        </Grid>
                        <Grid item p={1}>
                            <TextField fullWidth
                                       id="outlined-password-input"
                                       label="Password"
                                       name="Password"
                                       type="password"
                                       autoComplete="current-password"
                                       onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Typography sx={error}>{errorMessage}</Typography>
                        <Grid item xs={12} p={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
                            <Button type="submit" variant="contained">Submit</Button>
                        </Grid>
                        <Grid item xs={12} p={1}>
                            <p>Test Users</p>
                            <p>username: "spicejet", password: "123"</p>
                            <p>username: "vinod", password: "dev" </p>
                            <p>username: "test", password: "test123" </p>
                        </Grid>
                    </Box>
                </Typography>
            </Box>
        </>
    );
};