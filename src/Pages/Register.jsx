import React, { useState } from "react";
import { Box, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import instance from "../Services/Axios";
import { useNavigate } from "react-router-dom";
import { Toast } from "../Common/Funtion";

const Register = () => {

    const navigate = useNavigate();

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    }

    const clearInput = () => {
        setUserName('');
        setPassword('');
        setRole('');
    }

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [comPassword, setComPassword] = useState('');
    const [role, setRole] = useState('');


    const RegisterPage = () => {
        if (userName !== '' && password !== '' && role !== '' && comPassword !== '') {
            if (password === comPassword) {
                const data = {
                    userName: userName,
                    password: password,
                    role: role,
                };
    
                instance
                    .post('/user/register', data)
                    .then((res) => {
                        const identity = res.data.identity;
                        
                        if (identity === "Already") {
                            Toast.fire({
                                icon: "error",
                                title: "Username already registered!",
                                background: "#f8d7da",
                                color: "#721c24",
                            });
                            return; // Exit early if username is already taken
                        }
    
                        Toast.fire({
                            icon: "success",
                            title: "Registration Successful!",
                            background: "#d4edda",
                            color: "#155724",
                        });
    
                        clearInput();
                        setTimeout(() => {
                            navigate('/login');
                        }, 2000);
                    })
                    .catch((err) => {
                        console.error(err);
                        Toast.fire({
                            icon: "error",
                            title: "Registration Failed!",
                            background: "#f8d7da",
                            color: "#721c24",
                        });
                    });
            } else {
                Toast.fire({
                    icon: "error",
                    title: "Passwords do not match!",
                    background: "#f8d7da",
                    color: "#721c24",
                });
            }
        } else {
            Toast.fire({
                icon: "error",
                title: "Please fill in all fields!",
                background: "#f8d7da",
                color: "#721c24",
            });
        }
    };
    

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
                    height: "420px",
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
                        Welcome Back
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: "center", px: 4, mb: 3 }}>
                        Already have an account? Sign in to explore more!
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#fff",
                            color: "#6c1b8d",
                            "&:hover": { backgroundColor: "#e0d9f5" },
                        }}

                        onClick={() => navigate('/login')}
                    >
                        SIGN IN
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
                        Register
                    </Typography>

                    <TextField label="Username"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <TextField
                        label="Confirm Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => setComPassword(e.target.value)}

                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Role</InputLabel>
                        <Select value={role} onChange={handleRoleChange} variant="outlined">
                            <MenuItem value="Instructor">Instructor</MenuItem>
                            <MenuItem value="Student">Student</MenuItem>
                        </Select>
                    </FormControl>

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={RegisterPage}
                        sx={{
                            backgroundColor: "#6c1b8d",
                            color: "#fff",
                            "&:hover": { backgroundColor: "#50146e" },
                        }}
                    >
                        REGISTER
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Register;
