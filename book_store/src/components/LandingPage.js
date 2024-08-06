import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Box,
  Container,
  CircularProgress,
  IconButton,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

const LandingPage = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentDate, setCurrentDate] = useState("")
  const [showBannerAd, setShowBannerAd] = useState(true)
  const [showSidebarAd, setShowSidebarAd] = useState(true)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "https://freetestapi.com/api/v1/books?limit=5"
        )
        setBooks(response.data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    fetchBooks()
  }, [])

  useEffect(() => {
    const today = new Date()
    const formattedDate = today.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    setCurrentDate(formattedDate)
  }, [])

  const handleCloseBannerAd = () => setShowBannerAd(false)
  const handleCloseSidebarAd = () => setShowSidebarAd(false)

  if (loading) return <CircularProgress />
  if (error) return <p>Error: {error}</p>

  return (
    <Container>
      {showBannerAd && (
        <Box
          sx={{
            width: "100%",
            height: "320px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 4,
            mt: 1,
            position: "relative",
          }}
        >
          <img
            src='https://cdn.dribbble.com/users/795597/screenshots/2043382/gif_3.gif'
            alt='Banner Ad'
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <IconButton
            sx={{ position: "absolute", top: 8, right: 8, color: "white" }}
            onClick={handleCloseBannerAd}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography
          variant='h4'
          component='h1'
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          NEW BOOKS
        </Typography>
        <Typography
          variant='h6'
          component='h6'
          sx={{ mb: 2, fontStyle: "italic" }}
        >
          Last Updated: {currentDate}
        </Typography>
        <Typography variant='body1' sx={{ mb: 4 }}>
          With so many new books coming out, what’s the best way to choose what
          to read? At E Books, we believe that any book that helps with either
          enjoying life or understanding the world better is worth reading, and
          those are the qualities we look for in books. If you’re interested in
          a particular area—new historical fiction or new history books–we’ve
          also got more detailed lists you can click on, with a wider range of
          books.
          <br />
          <br />
          Publishing these days is very focused on identifying bestsellers and
          pushing them via highly focused marketing campaigns. We love
          bestsellers as much as the next person, but we try to focus on books
          of lasting value or that have something a bit special about them.
          <br />
          <br />
          (Note: We also have a list of the best books of all time. These have
          to be picked again and again in our expert interviews, so tend to be
          older books, with a few exceptions. Many of them are novels or
          historic texts already in the public domain and available as free
          ebooks).
        </Typography>

        <Grid container spacing={3}>
          {showSidebarAd && (
            <Grid item xs={12} md={3}>
              <Box
                sx={{
                  display: { xs: "none", md: "block" },
                  width: "100%",
                  height: "300px",

                  justifyContent: "center",
                  alignItems: "center",
                  mb: 4,
                  position: "relative",
                }}
              >
                <img
                  src='https://www.adazing.com/wp-content/uploads/2021/05/book-gif-10-1.gif'
                  alt='Sidebar Ad'
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: "white",
                  }}
                  onClick={handleCloseSidebarAd}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </Grid>
          )}

          <Grid item xs={12} md={showSidebarAd ? 9 : 12}>
            <Grid container spacing={3}>
              {books.map((book, index) => (
                <React.Fragment key={book.id}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Link
                      to={`/books/${book.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          border: "1px solid #e0e0e0",
                          backgroundColor: "#ffffff",
                          borderRadius: 0,
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: -12,
                            right: -12,
                            padding: "18px",
                            height: "20px",
                            width: "20px",
                            borderRadius: "50%",
                            backgroundColor: "#F88379",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant='caption'
                            color='white'
                            sx={{ fontWeight: "bold", fontSize: "14px" }}
                          >
                            Read
                          </Typography>
                        </Box>
                        <Card
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            border: "1px solid #e0e0e0",
                            backgroundColor: "#ffffff",
                            borderRadius: 0,
                          }}
                        >
                          <CardMedia
                            sx={{ height: 200 }}
                            image={book.cover_image}
                            title={book.title}
                          />
                          <CardContent>
                            <Typography
                              variant='h5'
                              component='div'
                              sx={{ fontWeight: "bold" }}
                            >
                              {book.title}
                            </Typography>
                            <Typography
                              variant='body1'
                              color='text.secondary'
                              sx={{ fontStyle: "italic" }}
                            >
                              by {book.author}
                            </Typography>
                            <Typography variant='body2' color='text.secondary'>
                              Price: $50
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                    </Link>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Link to='/home' style={{ textDecoration: "none" }}>
            <Typography variant='h6' component='p' color='primary'>
              View All Books
            </Typography>
          </Link>
        </Box>
      </Box>
    </Container>
  )
}

export default LandingPage
