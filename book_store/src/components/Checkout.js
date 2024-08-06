import React from "react"
import { Link } from "react-router-dom"
import { Box, Container, Typography } from "@mui/material"

const styles = {
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "80px",
  },
  image: {
    maxWidth: "100%",
    borderRadius: "8px",
  },
  link: {
    color: "#1976d2",
    padding: "8px",
    margin: "16px",
    textDecoration: "none",
  },
}

const Checkout = () => {
  return (
    <Container>
      <Box style={styles.root}>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "30px",
            marginTop: "22px",
            textAlign: "center",
          }}
        >
          <img
            src='./assets/shipped.png'
            alt='order shipped'
            style={{ width: "50%", height: "50%" }}
          />
          <br />
          Thank you.Visit again😇.
        </Typography>
      </Box>
      <Box textAlign='center' mt={3}>
        <Link to='/home' style={styles.link}>
          Go to Home Page....
        </Link>
      </Box>
    </Container>
  )
}

export default Checkout
