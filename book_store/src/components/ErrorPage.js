import { Box, Typography } from "@mui/material"
import React from "react"

export default function Error() {
  return (
    <div>
      <Box sx={{ mt: "120px" }}>
        <Typography
          sx={{ textAlign: "center", fontWeight: "bold", fontSize: "100px" }}
        >
          404🫥
        </Typography>
        <Typography sx={{ textAlign: "center" }}>
          oops.....Page not found
        </Typography>
      </Box>
    </div>
  )
}
