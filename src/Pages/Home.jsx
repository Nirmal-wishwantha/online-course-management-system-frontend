import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import AddCourseForm from '../Common/component/AddCourseForm'

export default function Home() {

    

    return (
        <div>

            <Box sx={{marginLeft:5}}>
                <Typography>
                    Home Page
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro et labore reiciendis accusamus facilis maiores, ab eius rerum tenetur animi eveniet accusantium vitae dolore minus nisi ipsa iste nihil totam.
                </Typography>
            </Box>

            <Box>
                <AddCourseForm/>
            </Box>

        </div>
    )
}
