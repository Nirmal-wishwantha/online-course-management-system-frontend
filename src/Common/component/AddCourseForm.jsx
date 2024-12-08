import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";
import instance from "../../Services/Axios";

export default function AddCourseForm() {
  const [open, setOpen] = useState(false);
  const [tital, setTital] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setTital("");
    setDescription("");
  };

  const addNewCourse = () => {
    if (!tital || !description) {
      setError("All fields are required.");
      return;
    }

    const userId = localStorage.getItem("educationID");
    const data = {
      title: tital,
      description: description,
      instructorId: userId,
    };

    instance
      .post("/course", data)
      .then((res) => {
        console.log(res);
        handleClose();
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to add course. Please try again.");

      });
  };

  return (
    <Box sx={{ margin: 3, padding: 2, boxShadow: 5, borderRadius: 2 ,backgroundColor:'#00b3b3'}}>


      <React.Fragment >

        <Box sx={{ justifyContent: 'center', display: 'flex' }}>
          <Button variant="outlined" onClick={handleClickOpen}
          sx={{
            backgroundColor:'#e6f7ff',
            "&:hover": { backgroundColor: "#007acc", color: "white" }
          }}
          >
            Add New Course
          </Button>
        </Box>


        <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{ textAlign: "center" }}>
            Add Your Course Details
          </DialogTitle>

          <DialogContent>
            {error && (
              <p style={{ color: "red", fontSize: "0.9rem", marginBottom: "1rem" }}>
                {error}
              </p>
            )}

            <TextField
              autoFocus
              required
              margin="dense"
              label="Title"
              fullWidth
              variant="standard"
              value={tital}
              onChange={(e) => setTital(e.target.value)}
            />

            <TextField
              required
              margin="dense"
              label="Description"
              fullWidth
              variant="standard"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} sx={{ color: "red" }}>
              Cancel
            </Button>

            <Button
              onClick={addNewCourse}

            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </Box>
  );
}
