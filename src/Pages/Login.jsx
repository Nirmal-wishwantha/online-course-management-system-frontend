import React, { useState } from 'react'
import { Box, Typography, TextField, Button, Checkbox, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import instance from '../Services/Axios';

import { Toast } from '../Common/Funtion';


export default function Login() {
    const navigate = useNavigate();

    const clearInput = () => {
        setUsername('');
        setPassword('');
    }

    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');



    const loginPage = () => {

        if (userName !== '' && password !== '') {

            const data = {
                userName: userName,
                password: password
            }
            instance.post('/user/login', data)
                .then((res) => {
                    localStorage.setItem('education', res.data.token)

                    Toast.fire({
                        icon: "success",
                        title: "Login Successful..!",
                        background: "#d4edda",
                        color: "#155724"
                    });

                    clearInput();
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                })

                .catch((err) => {
                    console.log(err);

                    Toast.fire({
                        icon: "error",
                        title: "Login Faild..!",
                        background: "#f8d7da",
                        color: "#721c24"
                    });

                })

        }

        Toast.fire({
            icon: "error",
            title: "Please fill in all fields!",
            background: "#f8d7da",
            color: "#721c24"
        });

    }

    return (
        <Box
            sx={{
                display: "flex",
                height: "100vh",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f5f5f5",
            }}
        >
            <Box
                sx={{
                    width: "800px",
                    height: "400px",
                    display: "flex",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                    borderRadius: "10px",
                    overflow: "hidden",
                    backgroundColor: "#fff",
                    padding: "10px"
                }}
            >
                {/* Left Section */}
                <Box
                    sx={{
                        flex: 1,
                        backgroundColor: "#6c1b8d",
                        color: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "10px"
                    }}
                >
                    <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                        Welcome
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: "center", px: 4, mb: 3 }}>
                        Join Our Unique Platform, Explore a New Experience
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#fff",
                            color: "#6c1b8d",
                            "&:hover": { backgroundColor: "#e0d9f5" },
                        }}
                        onClick={() => navigate("/register")}
                    >
                        REGISTER
                    </Button>
                </Box>

                {/* Right Section */}
                <Box
                    sx={{
                        flex: 1,
                        padding: "40px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
                        Sign In
                    </Typography>

                    <TextField
                        label="Username"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => setPassword(e.target.value)}

                    />

                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Checkbox />
                        <Typography variant="body2">Remember me</Typography>
                        <Link href="#" underline="none" sx={{ ml: "auto", fontSize: "14px" }}>
                            Forgot password?
                        </Link>
                    </Box>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={loginPage}
                        sx={{
                            backgroundColor: "#6c1b8d",
                            color: "#fff",
                            "&:hover": { backgroundColor: "#50146e" },
                        }}
                    >
                        LOGIN
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
