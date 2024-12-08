import React, { useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from "@mui/material";

const AddLessonForm = () => {
    const [open, setOpen] = useState(false);
    const [lessonNumber, setLessonNumber] = useState("");
    const [lessonTopic, setLessonTopic] = useState("");
    const [file, setFile] = useState(null);

    // Handle dialog open/close
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        clearForm();
    };

    // Handle form submission
    const handleSubmit = () => {
        // You can add your API call logic here
        console.log({
            lessonNumber,
            lessonTopic,
            file,
        });

        // Clear form and close dialog
        clearForm();
        setOpen(false);
    };

    // Clear form inputs
    const clearForm = () => {
        setLessonNumber("");
        setLessonTopic("");
        setFile(null);
    };

    return (
        <div style={{ padding: "20px" }}>


            <Box sx={{width:'80%',boxShadow:2,borderRadius:2}}>
                <Box>
                    <Typography>
                        Course Title
                    </Typography>
                    <Typography>
                        This is the course description providing an overview of the content.
                    </Typography>
                </Box>

                <Box>
                    <Button variant="contained" color="primary" onClick={handleOpen}>
                        Add Lesson
                    </Button>
                </Box>


            </Box>





            {/* Popup Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Lesson</DialogTitle>
                <DialogContent>
                    {/* Lesson Number */}
                    <TextField
                        label="Lesson Number"
                        type="number"
                        value={lessonNumber}
                        onChange={(e) => setLessonNumber(e.target.value)}
                        fullWidth
                        margin="normal"
                    />

                    {/* Lesson Topic */}
                    <TextField
                        label="Lesson Topic"
                        value={lessonTopic}
                        onChange={(e) => setLessonTopic(e.target.value)}
                        fullWidth
                        margin="normal"
                    />

                    {/* File Upload */}
                    <label>
                        Upload Lesson Folder:
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            style={{ marginTop: "10px" }}
                        />
                    </label>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddLessonForm;
