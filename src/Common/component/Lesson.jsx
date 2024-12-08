import { useState } from "react";
import React from "react";
import {
    Box,
    Button,
    Typography,
    Modal,
    TextField,
    Menu,
    MenuItem,
} from "@mui/material";

export default function Lesson({ no, topic, description, onClickDetete }) {
    const [lessons, setLessons] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newLessonTopic, setNewLessonTopic] = useState("");
    const [uploadedFile, setUploadedFile] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedResources, setSelectedResources] = useState([]);

    // Modal handlers
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setNewLessonTopic("");
        setUploadedFile(null);
        setIsModalOpen(false);
    };

    // File input handler
    const handleFileUpload = (e) => setUploadedFile(e.target.files[0]);

    // Submit new lesson
    const handleSubmit = () => {
        if (!newLessonTopic || !uploadedFile) {
            alert("Please fill out all fields!");
            return;
        }

        const newLesson = {
            id: lessons.length + 1,
            topic: newLessonTopic,
            resources: [
                { type: "pdf", url: `/path/to/${uploadedFile.name}`, title: uploadedFile.name },
            ],
        };

        setLessons([...lessons, newLesson]);
        handleCloseModal();
    };

    // Dropdown handlers
    const handleOpenDropdown = (event, resources) => {
        setAnchorEl(event.currentTarget);
        setSelectedResources(resources);
    };

    const handleCloseDropdown = () => {
        setAnchorEl(null);
        setSelectedResources([]);
    };

    return (
        <Box sx={{ p: 4, maxWidth: 800, mx: "auto" }}>

            {/* Course Details */}

            <Box sx={{backgroundColor:'#99d6ff',padding:2,borderRadius:2}}>
                <Box sx={{ boxShadow: 3, borderRadius: 2, p: 3, backgroundColor: "#f5f5f5" }}>
                    <Typography
                        variant="h6"
                        sx={{ backgroundColor: "#1976d2", color: "white", p: 1, borderRadius: 1, textAlign: "center" }}
                    >
                        Course: {no}
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 2, textAlign: "center", fontWeight: 600 }}>
                        {topic}
                    </Typography>
                    <Typography sx={{ mt: 2, p: 2, borderRadius: 1, backgroundColor: "#e3f2fd" }}>
                        {description}
                    </Typography>
                </Box>

                {/* Lessons Section */}
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" sx={{ mb: 2, textAlign: "center" ,fontWeight:700}}>
                        Your Lessons
                    </Typography>
                    <Button variant="contained" onClick={handleOpenModal} sx={{ mb: 2 }}>
                        Add Lesson
                    </Button>

                    {/* Lessons List */}
                    {lessons.length > 0 ? (
                        lessons.map((lesson) => (
                            <Box
                                key={lesson.id}
                                sx={{
                                    mb: 2,
                                    p: 2,
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    backgroundColor: "#f1f8e9",
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                                    Lesson {lesson.id}: {lesson.topic}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    onClick={(e) => handleOpenDropdown(e, lesson.resources)}
                                    sx={{
                                        mt: 1,
                                        "&:hover": { backgroundColor: "#4caf50", color: "white" },
                                    }}
                                    disabled={lesson.resources.length === 0}
                                >
                                    View Resources
                                </Button>
                            </Box>
                        ))
                    ) : (
                        <Typography
                            sx={{
                                mt: 2,
                                textAlign: "center",
                                backgroundColor: "#ffcdd2",
                                color: "#b71c1c",
                                p: 2,
                                borderRadius: 1,
                            }}
                        >
                            No lessons available.
                        </Typography>
                    )}
                </Box>

                {/* Delete Course */}
                <Box sx={{ textAlign: "right", mt: 4 }}>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={onClickDetete}
                        sx={{
                            "&:hover": { backgroundColor: "#d32f2f" },
                        }}
                    >
                        Delete Course
                    </Button>
                </Box>
            </Box>




            {/* Add Lesson Modal */}
            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Add New Lesson
                    </Typography>
                    <TextField
                        label="Lesson Topic"
                        fullWidth
                        variant="outlined"
                        value={newLessonTopic}
                        onChange={(e) => setNewLessonTopic(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button
                        variant="outlined"
                        component="label"
                        fullWidth
                        sx={{ mb: 2 }}
                    >
                        Upload File
                        <input type="file" hidden onChange={handleFileUpload} />
                    </Button>
                    {uploadedFile && (
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            Selected File: {uploadedFile.name}
                        </Typography>
                    )}
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button onClick={handleCloseModal} sx={{ mr: 2 }}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* Resources Dropdown Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseDropdown}
            >
                {selectedResources.length > 0 ? (
                    selectedResources.map((resource, index) => (
                        <MenuItem key={index} onClick={() => window.open(resource.url, "_blank")}>
                            {resource.type === "pdf" && <Typography>📄 {resource.title}</Typography>}
                            {resource.type === "video" && <Typography>🎥 {resource.title}</Typography>}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem disabled>
                        <Typography>No resources available</Typography>
                    </MenuItem>
                )}
            </Menu>
        </Box>
    );
}
