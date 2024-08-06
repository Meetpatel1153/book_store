import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  TextField,
  Box,
  Container,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material"
import { fetchBooks } from "../redux/action/BookSlice"
import Loader from "../components/Loader"

const Home = () => {
  const dispatch = useDispatch()
  const { books, loading, error } = useSelector((state) => state.books)
  const [filteredBooks, setFilteredBooks] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [publishYear, setPublishYear] = useState("")
  const [genre, setGenre] = useState("")

  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  useEffect(() => {
    setFilteredBooks(books)
  }, [books])

  const handleSearch = (query) => {
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredBooks(filtered)
  }

  const handleSort = (order) => {
    const sorted = [...filteredBooks].sort((a, b) => {
      if (order === "asc") {
        return a.title.localeCompare(b.title)
      } else {
        return b.title.localeCompare(a.title)
      }
    })
    setFilteredBooks(sorted)
  }

  const handleSearchChange = (event) => {
    const query = event.target.value
    setSearchQuery(query)
    handleSearch(query)
  }

  const handleSortChange = (event) => {
    const order = event.target.value
    setSortBy(order)
    handleSort(order)
  }

  const handlePublishYearChange = (event) => {
    const year = event.target.value
    setPublishYear(year)
    filterBooks(year, genre)
  }

  const handleGenreChange = (event) => {
    const selectedGenre = event.target.value
    setGenre(selectedGenre)
    filterBooks(publishYear, selectedGenre)
  }

  const filterBooks = (year, genre) => {
    const filtered = books.filter((book) => {
      const matchesYear = year ? book.publication_year === year : true
      const matchesGenre = genre ? book.genre === genre : true
      return matchesYear && matchesGenre
    })
    setFilteredBooks(filtered)
  }

  if (loading) return <Loader />
  if (error) return <p>Error: {error}</p>

  return (
    <Container fullWidth>
      <Box
        sx={{
          mt: 4,
          mb: 4,
        }}
      >
        <Typography
          variant='h4'
          component='h1'
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          📚 ALL BOOKS
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              id='search'
              label='Search'
              variant='outlined'
              value={searchQuery}
              onChange={handleSearchChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl variant='outlined' fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                onChange={handleSortChange}
                label='Sort By'
              >
                <MenuItem value='asc'>Ascending</MenuItem>
                <MenuItem value='desc'>Descending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl variant='outlined' fullWidth>
              <InputLabel>Publish Year</InputLabel>
              <Select
                value={publishYear}
                onChange={handlePublishYearChange}
                label='Publish Year'
              >
                <MenuItem value=''>
                  <em>All</em>
                </MenuItem>
                {[...new Set(books.map((book) => book.publication_year))].map(
                  (year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl variant='outlined' fullWidth>
              <InputLabel>All</InputLabel>
              <Select value={genre} onChange={handleGenreChange} label='Genre'>
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {[...new Set(books.map((book) => book.genre))].map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    <span
                      style={{
                        backgroundColor: "skyblue",
                        padding: "2px 9px",
                        border: "none",
                        borderRadius: "5px",
                      }}
                    >
                      {genre[0]}
                    </span>
                    &nbsp;&nbsp;&nbsp;
                    <span
                      style={{
                        backgroundColor: "skyblue",
                        padding: "2px 9px",
                        border: "none",
                        borderRadius: "5px",
                      }}
                    >
                      {genre[1]}
                    </span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      {filteredBooks.length === 0 && (
        <Typography variant='body1' sx={{ mb: 4, mt: "20px" }}>
          Oops... No books found . Please try a different search term.
        </Typography>
      )}
      <Grid container spacing={3}>
        {filteredBooks.map((book) => (
          <Grid item key={book.id} xs={12} sm={6} md={4}>
            <Link to={`/books/${book.id}`} style={{ textDecoration: "none" }}>
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
                      price - $50
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Home
