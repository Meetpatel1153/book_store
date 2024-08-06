import React, { useContext, useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  MenuItem,
  Menu,
} from "@mui/material"
import ImportContactsIcon from "@mui/icons-material/ImportContacts"
import MenuIcon from "@mui/icons-material/Menu"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../context/userContext"
import { useSelector } from "react-redux"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

const Navbar = () => {
  const { isLoggedIn, logoutUser } = useContext(UserContext)
  const navigate = useNavigate()
  const cartItems = useSelector((state) => state.cart.items)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleLogout = () => {
    logoutUser()
    navigate("/login")
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position='sticky' sx={{ boxShadow: "none" }}>
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            alignItems: "center",
          }}
        >
          <Link
            to='/'
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton sx={{ color: "skyblue" }} edge='start'>
              <ImportContactsIcon />
            </IconButton>
            <Typography
              variant='h6'
              component='div'
              sx={{ fontFamily: "Impact, fantasy" }}
            >
              E <span style={{ color: "skyblue" }}>BOOK</span>
            </Typography>
          </Link>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {isLoggedIn ? (
            <>
              <Button color='inherit'>
                <Link
                  to='/home'
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Home
                </Link>
              </Button>
              <Button
                color='inherit'
                component={Link}
                to='/cart'
                style={{ textDecoration: "none", position: "relative" }}
              >
                <ShoppingCartIcon />
                {cartItems.length > 0 && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 9,
                      backgroundColor: "skyblue",
                      color: "white",
                      fontSize: "0.8rem",
                      borderRadius: "50%",
                      width: "18px",
                      height: "18px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span>{cartItems.length}</span>
                  </Box>
                )}
              </Button>
              <Button
                color='inherit'
                component={Link}
                to='/profile'
                style={{ textDecoration: "none" }}
              >
                Profile
              </Button>
              <Button color='inherit' onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color='inherit'>
                <Link
                  to='/home'
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Home
                </Link>
              </Button>
              <Button color='inherit'>
                <Link
                  to='/login'
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Login
                </Link>
              </Button>

              <Button color='inherit'>
                <Link
                  to='/signup'
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Signup
                </Link>
              </Button>
            </>
          )}
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton color='inherit' onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {isLoggedIn ? (
              <>
                <MenuItem onClick={handleMenuClose}>
                  <Link
                    to='/home'
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Home
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Button
                    color='inherit'
                    component={Link}
                    to='/cart'
                    style={{ textDecoration: "none", position: "relative" }}
                  >
                    <ShoppingCartIcon />
                    {cartItems.length > 0 && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 9,
                          backgroundColor: "skyblue",
                          color: "white",
                          fontSize: "0.8rem",
                          borderRadius: "50%",
                          width: "18px",
                          height: "18px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <span>{cartItems.length}</span>
                      </Box>
                    )}
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Link
                    to='/profile'
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Link
                    to='/login'
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Logout
                  </Link>
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={handleMenuClose}>
                  <Link
                    to='/home'
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Home
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Link
                    to='/login'
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Login
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Link
                    to='/signup'
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Signup
                  </Link>
                </MenuItem>
              </>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
