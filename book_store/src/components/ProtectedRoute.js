import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ element }) => {
  return localStorage.getItem("isLoggedIn") ? element : <Navigate to='/login' />
}

export default ProtectedRoute
