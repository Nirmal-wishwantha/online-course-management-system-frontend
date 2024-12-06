import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import instance from '../Services/Axios'

export default function Home() {

    const logout =()=>{
        localStorage.removeItem('education');
    }

  return (
    <div>
        <Box>
            <Typography>
                Home page
            </Typography>

            <Button onClick={logout}>
                Log out
            </Button>
        </Box>
      
    </div>
  )
}
