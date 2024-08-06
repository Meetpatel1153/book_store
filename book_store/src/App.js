import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./auth/Login"
import Signup from "./auth/Signup"
import { ToastContainer } from "react-toastify"
import { UserProvider } from "./context/userContext"
import "react-toastify/dist/ReactToastify.css"
import Home from "./views/Home"
import BookDetails from "./views/BookDetails"
import Cart from "./components/Cart"
import Navbar from "./components/Navbar"
import Checkout from "./components/Checkout"
import Profile from "./views/ProfilePage"
import ProtectedRoute from "./components/ProtectedRoute"
import Error from "./components/ErrorPage"
import LandingPage from "./components/LandingPage"
import "./global.css"


function App() {
  return (
    <div className='App'>
      <UserProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='*' element={<Error />} />
            <Route path='/home' element={<Home />} />
            <Route path='/books/:id' element={<BookDetails />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<LandingPage />} />
            <Route
              path='/cart'
              element={<ProtectedRoute element={<Cart />} />}
            />
            <Route
              path='/profile'
              element={<ProtectedRoute element={<Profile />} />}
            />
            <Route
              path='/checkout'
              element={<ProtectedRoute element={<Checkout />} />}
            />
          </Routes>
        </BrowserRouter>
      </UserProvider>
      <ToastContainer
        position='top-right'
        autoClose={700}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </div>
  )
}

export default App
