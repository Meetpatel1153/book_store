import React, { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { fetchBookDetails } from "../redux/action/BookSlice"
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
} from "@mui/material"
import { addToCart } from "../redux/action/CartSlice"
import Loader from "../components/Loader"
import { toast } from "react-toastify"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { UserContext } from "../context/userContext"

const BookDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { book, loading, error } = useSelector((state) => state.books)
  const { currentUser } = useContext(UserContext)

  useEffect(() => {
    dispatch(fetchBookDetails(id))
  }, [dispatch, id])

  const handleAddToCart = () => {
    if (currentUser) {
      if (book) {
        dispatch(addToCart(book))
        toast.success("Added to cart")
      }
    } else {
      toast.error("login first")
      navigate("/login")
    }
  }

  if (loading) return <Loader />
  if (error) return <p>Error: {error}</p>

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Button variant='contained' onClick={() => navigate(-1)}>
          <ArrowBackIcon /> Back
        </Button>
        <Grid container spacing={3} sx={{ mt: 5 }}>
          <Grid item xs={6} sm={6}>
            <Card sx={{ height: "50%" }}>
              <CardMedia
                component='img'
                height='100%'
                image={book?.cover_image}
                alt={book?.title}
              />
            </Card>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                variant='h4'
                component='h1'
                sx={{ fontWeight: "bold" }}
              >
                {book?.title}
              </Typography>
              <Typography variant='h5'>
                published year:
                <span style={{ fontWeight: "bold", color: "red" }}>
                  {book?.publication_year}
                </span>
              </Typography>
              <Typography
                variant='h6'
                component='h2'
                sx={{ mt: 2, fontStyle: "italic" }}
              >
                by {book?.author}
              </Typography>
              <Typography variant='body1' sx={{ mt: 2 }}>
                {book?.description}
              </Typography>
              <Typography variant='h5' sx={{ mt: 2 }}>
                Price: $50
              </Typography>
              <Button
                variant='contained'
                color='primary'
                sx={{ mt: 2, width: "150px" }}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default BookDetails
