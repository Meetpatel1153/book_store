import React, { useContext } from "react"
import { useForm } from "react-hook-form"
import { TextField, Button, Grid, Typography, Box } from "@mui/material"
import { UserContext } from "../context/userContext"
import CryptoJS from "crypto-js"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Signup = () => {
  const { users, addUser } = useContext(UserContext)
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()

  const password = watch("password")

  const onSubmit = (data) => {
    const emailExists = users.some((user) => user.email === data.email)
    if (emailExists) {
      toast.error("Email already exists")
      return
    }

    const encryptedPassword = CryptoJS.AES.encrypt(
      data.password,
      "meet@123"
    ).toString()
    const newUser = { ...data, password: encryptedPassword }
    addUser(newUser)
    toast.success("Signup successfully")
    reset()
    navigate("/login")
  }

  return (
    <Grid container sx={{ height: "93vh" }}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <Box
          component='img'
          src='/assets/signup.jpeg'
          alt='Signup page'
          sx={{ maxWidth: "600px", height: "auto" }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 400, p: 4 }}>
          <Typography
            variant='h4'
            component='h1'
            sx={{ marginBottom: "5px", fontWeight: "bold" }}
          >
            Signup Form
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='First Name'
                  {...register("firstName", { required: true })}
                  error={!!errors.firstName}
                  helperText={errors.firstName ? "First name is required" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Last Name'
                  {...register("lastName", { required: true })}
                  error={!!errors.lastName}
                  helperText={errors.lastName ? "Last name is required" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Email'
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  error={!!errors.email}
                  helperText={errors.email ? "Email is required" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Mobile Number'
                  {...register("mobileNumber", {
                    required: true,
                    pattern: [0 - 9],
                    minLength: 10,
                  })}
                  error={!!errors.mobileNumber}
                  helperText={
                    errors.mobileNumber ? "Mobile number is required" : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type='password'
                  label='Password'
                  {...register("password", { required: true, minLength: 6 })}
                  error={!!errors.password}
                  helperText={
                    errors.password
                      ? "Password must be at least 6 characters"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type='password'
                  label='Confirm Password'
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  error={!!errors.confirmPassword}
                  helperText={
                    errors.confirmPassword ? errors.confirmPassword.message : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant='contained'
                  color='primary'
                  fullWidth
                  type='submit'
                >
                  Signup
                </Button>
              </Grid>
            </Grid>
          </form>
          <Typography
            sx={{
              mt: "8px",
              color: "gray",
              fontSize: "15px",
            }}
          >
            Have already an account?{" "}
            <Link to='/login'>
              <span style={{ textDecoration: "none" }}>Log in</span>
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Signup
