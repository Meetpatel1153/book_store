import React, { useContext, useState } from "react"
import {
  Avatar,
  Box,
  Button,
  Container,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material"
import { UserContext } from "../context/userContext"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import EditIcon from "@mui/icons-material/Edit"
import { toast } from "react-toastify"

const Profile = () => {
  const { currentUser, updateUser, changePassword } = useContext(UserContext)
  const [openEdit, setOpenEdit] = useState(false)
  const [openPassword, setOpenPassword] = useState(false)
  const [newDetails, setNewDetails] = useState(currentUser)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const handleEdit = () => {
    updateUser(newDetails)
    toast.success("Profile updated successfully")
    setOpenEdit(false)
  }

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match")
      return
    }
    const success = changePassword(currentUser.email, oldPassword, newPassword)
    if (success) {
      toast.success("Password changed successfully")
      setOpenPassword(false)
      setOldPassword("")
      setNewPassword("")
      setPasswordError("")
      setConfirmPassword("")
    } else {
      setPasswordError("Incorrect old password")
    }
  }

  return (
    <Container maxWidth='md'>
      <Paper
        elevation={3}
        sx={{
          mt: 10,
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ bgcolor: "primary.main", width: 80, height: 80 }}>
          <AccountCircleIcon sx={{ fontSize: 50 }} />
        </Avatar>
        <Typography variant='h4' component='h1' sx={{ mt: 2, mb: 1 }}>
          Profile
        </Typography>
        <Typography variant='h6'>Email: {currentUser.email}</Typography>
        <Typography variant='h6'>
          Name: {currentUser.firstName}&nbsp;{currentUser.lastName}
        </Typography>
        <Typography variant='h6'>
          Phone Number: {currentUser.mobileNumber}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            variant='contained'
            startIcon={<EditIcon />}
            onClick={() => setOpenEdit(true)}
            sx={{ mr: 2 }}
          >
            Edit Profile
          </Button>
          <Button
            variant='contained'
            startIcon={<LockOpenIcon />}
            onClick={() => setOpenPassword(true)}
          >
            Change Password
          </Button>
        </Box>
      </Paper>

      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        <Box
          sx={{
            p: 4,
            bgcolor: "background.paper",
            margin: "auto",
            mt: 20,
            width: "70%",
            maxWidth: 400,
            border: "1px solid skyblue",
            borderRadius: "10px",
          }}
        >
          <Typography variant='h6' component='h2' sx={{ fontWeight: "bold" }}>
            <AccountCircleIcon /> Edit Profile
          </Typography>
          <TextField
            label='First Name'
            value={newDetails.firstName}
            onChange={(e) =>
              setNewDetails({ ...newDetails, firstName: e.target.value })
            }
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label='Last Name'
            value={newDetails.lastName}
            onChange={(e) =>
              setNewDetails({ ...newDetails, lastName: e.target.value })
            }
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label='Email'
            value={newDetails.email}
            onChange={(e) =>
              setNewDetails({ ...newDetails, email: e.target.value })
            }
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label='Phone Number'
            value={newDetails.mobileNumber}
            onChange={(e) =>
              setNewDetails({ ...newDetails, mobileNumber: e.target.value })
            }
            fullWidth
            sx={{ mt: 2 }}
          />
          <Button variant='contained' onClick={handleEdit} sx={{ mt: 2 }}>
            Save Changes
          </Button>
        </Box>
      </Modal>

      <Modal open={openPassword} onClose={() => setOpenPassword(false)}>
        <Box
          sx={{
            p: 4,
            bgcolor: "background.paper",
            margin: "auto",
            mt: 30,
            width: "70%",
            maxWidth: 400,
            border: "1px solid skyblue",
            borderRadius: "10px",
          }}
        >
          <Typography variant='h6' component='h2' sx={{ fontWeight: "bold" }}>
            <LockOpenIcon /> Change Password
          </Typography>
          <TextField
            label='Old Password'
            type='password'
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label='New Password'
            type='password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label='Confirm Password'
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />
          {passwordError && (
            <Typography color='error' sx={{ mt: 2 }}>
              {passwordError}
            </Typography>
          )}
          <Button
            variant='contained'
            onClick={handleChangePassword}
            sx={{ mt: 2 }}
          >
            Change Password
          </Button>
        </Box>
      </Modal>
    </Container>
  )
}

export default Profile
