import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import instance from '../Services/Axios'
import Sidebar from '../Common/component/Sidebar ';

export default function Home() {

    const logout =()=>{
        localStorage.removeItem('education');
    }

  return (
    <div>
        <Box>
           <Sidebar/>
        </Box>
      
    </div>
  )
}
