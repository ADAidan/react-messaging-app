import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const NoMessages = () => {
  return (
    <Grid item xs={12}>
      <Typography variant="h6" component="h6" align="center">
        Looks like there are no messages yet! How about starting with hello?
      </Typography>
    </Grid>
  )
}

export default NoMessages