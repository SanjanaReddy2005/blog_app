// import React from "react";
import {Box, AppBar, Toolbar, Button, Typography} from '@mui/material'

export const Header = () => {
    return(
        <div>
            <AppBar className=" sticky top-0">
                <Toolbar>
                    <Typography variant="h4">
                        My Blog App
                    </Typography>
                    <Box className="flex ml-auto">
                       <Button sx={{margin:1,color:'white'}}>Login</Button>
                       <Button sx={{margin:1,color:'white'}}>Register</Button>
                       <Button sx={{margin:1,color:'white'}}>Logout</Button>
                    </Box>

                </Toolbar>
            </AppBar>

        </div>
    )
}