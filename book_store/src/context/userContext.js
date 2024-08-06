import React, { createContext, useState, useEffect } from "react"
import CryptoJS from "crypto-js"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || []
    setUsers(storedUsers)

    const loggedInStatus =
      JSON.parse(localStorage.getItem("isLoggedIn")) || false
    setIsLoggedIn(loggedInStatus)

    const storedUser = JSON.parse(localStorage.getItem("currentUser"))
    setCurrentUser(storedUser)
  }, [])

  const addUser = (user) => {
    const updatedUsers = [...users, user]
    setUsers(updatedUsers)
    localStorage.setItem("users", JSON.stringify(updatedUsers))
  }

  const loginUser = (user) => {
    setIsLoggedIn(true)
    setCurrentUser(user)
    localStorage.setItem("isLoggedIn", JSON.stringify(true))
    localStorage.setItem("currentUser", JSON.stringify(user))
  }

  const logoutUser = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("currentUser")
  }

  const updateUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.email === updatedUser.email ? updatedUser : user
    )
    setUsers(updatedUsers)
    setCurrentUser(updatedUser)
    localStorage.setItem("users", JSON.stringify(updatedUsers))
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))
  }

  const changePassword = (email, oldPassword, newPassword) => {
    const user = users.find((user) => user.email === email)
    if (user) {
      const decryptedPassword = CryptoJS.AES.decrypt(
        user.password,
        "meet@123"
      ).toString(CryptoJS.enc.Utf8)

      if (decryptedPassword === oldPassword) {
        const encryptedNewPassword = CryptoJS.AES.encrypt(
          newPassword,
          "meet@123"
        ).toString()
        user.password = encryptedNewPassword
        updateUser(user)
        return true
      }
    }
    return false
  }

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        addUser,
        isLoggedIn,
        setIsLoggedIn,
        loginUser,
        logoutUser,
        currentUser,
        updateUser,
        changePassword,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
