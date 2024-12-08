import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Lesson from '../Common/component/Lesson';
import AddLessonForm from '../Common/component/AddLessonForm';
import AddCourseForm from '../Common/component/AddCourseForm'
import instance from '../Services/Axios';
import { Toast } from '../Common/Funtion';



export default function Home() {

    useEffect(() => {
        getCourse();
    }, [])

    const [course, setCourse] = useState([]);

    const getCourse = () => {
        const id = localStorage.getItem('educationID')

        instance.get(`/course/instructor/${id}`)
            .then((res) => {
                setCourse(res.data);
                console.log(res);

            })
            .catch((err) => {
                console.log(err);

            })
    }


    // delete cours

    const detleteCours = (id) => {
        instance.delete(`/course/${id}`)
        .then((res)=>{
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
        .catch((err)=>{
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
        <div>

            <Box>
                <Box>
                    <AddCourseForm />
                </Box>


                <Box>

                    {
                        course.map((val, index) => (
                            <Lesson
                                key={index}
                                no={index + 1}
                                topic={val.title}
                                description={val.description}
                                onClickDetete={()=>detleteCours(val.id)}
                            />

                        ))
                    }
                </Box>

            </Box>


        </div >
    );
}
