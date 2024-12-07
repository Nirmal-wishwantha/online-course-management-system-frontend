import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import instance from "../../Services/Axios";

export default function AddCourseForm() {
  const [open, setOpen] = useState(false);
  const [tital, setTital] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(""); 
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

    setLoading(true);
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
        setLoading(false);
        handleClose();
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to add course. Please try again.");
        setLoading(false);
      });
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add New Course
      </Button>

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
            disabled={loading}
            sx={{ color: loading ? "gray" : "blue" }}
          >
            {loading ? "Adding..." : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
