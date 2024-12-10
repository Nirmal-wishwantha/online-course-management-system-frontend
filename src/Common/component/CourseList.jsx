import { Box, Button, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import instance from '../../Services/Axios';
import { Toast } from '../Funtion';

export default function CourseList() {
  const [course, setCourse] = useState([]);

  useEffect(() => {
    getCourse();
  }, []);

  const getCourse = () => {
    const id = localStorage.getItem('educationID');
    instance.get(`/course/instructor/${id}`)
      .then((res) => {
        setCourse(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // delete course

  const detleteCours = (id) => {
    instance.delete(`/course/${id}`)
      .then((res) => {
        console.log(res);

        Toast.fire({
          icon: "success",
          title: "Delete Course Successful..!",
          background: "#d4edda",
          color: "#155724"
        });

        setTimeout(() => {
          getCourse();
        }, 1000);

      })
      .catch((err) => {
        console.log(err);
        Toast.fire({
          icon: "error",
          title: "Delete Faild..!",
          background: "#f8d7da",
          color: "#721c24"
        });
      })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 2
      }}
    >
      <Box sx={{ width: '90%' }}>
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: 30,
            fontWeight: 700,
            marginBottom: 3

          }}
        >
          Course List
        </Typography>

        <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
          <Table size="small" aria-label="a dense table">

            <TableHead>
              <TableRow sx={{backgroundColor:'black',padding:1}}>
                <TableCell align='center' sx={{ width: '10%' ,color:'white',fontSize:20}}>No</TableCell>
                <TableCell sx={{color:'white',fontSize:20}}>Courses</TableCell>
                <TableCell align='center' sx={{color:'white',fontSize:20}}>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {course.map((val, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align='center'>{index + 1}</TableCell>
                  <TableCell>{val.title}</TableCell>

                  <TableCell align='center' width={'15%'}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={()=>detleteCours(val.id)}
                      sx={{
                        "&:hover": { backgroundColor: "#d32f2f" },
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
