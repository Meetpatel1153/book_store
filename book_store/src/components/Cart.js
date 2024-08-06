import React from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  emptyCart,
} from "../redux/action/CartSlice"
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  IconButton,
  Divider,
} from "@mui/material"
import {
  DeleteOutlineOutlined as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from "@mui/icons-material"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const Cart = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  const navigate = useNavigate()

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id))
    toast.success("Cart removed successfully")
  }

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id))
  }

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id))
  }

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.quantity * 50, 0)
  }

  const checkout = () => {
    dispatch(emptyCart())
    toast.success("your order has been confirmed.")
    navigate("/checkout")
  }

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant='h4' component='h1' sx={{ fontWeight: "bold" }}>
          🛒 Cart
        </Typography>
        <Divider sx={{ my: 2 }} />
        {cartItems.length === 0 ? (
          <>
            <Typography
              sx={{
                textAlign: {
                  lg: "center",
                  md: "center",
                  sm: "start",
                  xs: "start",
                },
                fontWeight: "bold",
                fontSize: "30px",
              }}
            >
              Your cart is empty😪 .
            </Typography>
          </>
        ) : (
          <>
            {cartItems.map((item) => (
              <Grid container spacing={2} key={item.id} alignItems='center'>
                <Grid item xs={3}>
                  <img
                    src={item.cover_image}
                    alt={item.title}
                    style={{ width: "50%" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='h6'>
                    {item.title} by {item.author} - $50
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <IconButton onClick={() => handleDecrement(item.id)}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant='body1' sx={{ mx: 2 }}>
                      {item.quantity}
                    </Typography>
                    <IconButton onClick={() => handleIncrement(item.id)}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant='h6' align='right'>
                    ${(item.quantity * 50).toFixed(2)}
                  </Typography>
                  <Typography variant='h6' align='right'>
                    <Button
                      variant='text'
                      color='secondary'
                      onClick={() => handleRemoveFromCart(item.id)}
                      startIcon={<DeleteIcon />}
                      size='small'
                      sx={{ mt: 1 }}
                    >
                      Remove
                    </Button>
                  </Typography>
                </Grid>
                <Divider />
              </Grid>
            ))}
            <Box sx={{ mt: 2 }}>
              <Divider />
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Typography variant='h5' sx={{ fontWeight: "bold" }}>
                  Total: ${calculateTotalPrice().toFixed(2)}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button
                  onClick={checkout}
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "skyblue",
                    border: "1px solid skyblue",
                    padding: "8px 28px",
                  }}
                >
                  CHECKOUT
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Container>
  )
}

export default Cart
