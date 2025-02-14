import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { Avatar, Button, Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { deepPurple, yellow } from "@mui/material/colors";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#000000", paper: "#000000" },
    text: { primary: "#ffffff", secondary: "#bdbdbd" },
  },
});

const lightTheme = createTheme({
  palette: { mode: "light" },
});

const UserProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Ви успішно вийшли з акаунту!"); // Повідомлення про успішний вихід
    navigate("/", { state: { message: "Ви успішно вийшли з акаунту!" } });
  };

  const handleEditProfile = () => {
    navigate("/edit-profile"); // Перехід на сторінку редагування профілю
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: 2 }}>
        <Card sx={{ maxWidth: 900, width: "100%", boxShadow: darkMode ? 0 : 6, borderRadius: 3, overflow: "hidden", backgroundColor: darkMode ? "#000000" : "#fff", position: "relative" }}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: yellow[700], padding: 3 }}>
            <Avatar sx={{ bgcolor: deepPurple[300], width: 120, height: 120, fontSize: "3rem", border: `4px solid ${darkMode ? "#333" : "#fff"}` }}>
              {user?.name?.[0] || "?"}
            </Avatar>
          </Box>
          <Box sx={{ position: "absolute", top: 16, right: 16 }}>
            <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>
          <CardContent sx={{ padding: 4 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, fontFamily: "'Roboto Slab', serif", color: darkMode ? yellow[200] : deepPurple[700] }}>
              {user?.name || "Neznámy používateľ"}
            </Typography>
            <Typography variant="body1" color="textSecondary" align="center">Email: {user?.email || "Žiadny e-mail"}</Typography>
            <Typography variant="body1" color="textSecondary" align="center">Rola: {user?.role || "Neznáme"}</Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
              <Button variant="contained" color="primary" onClick={handleEditProfile} sx={{ borderRadius: 2, backgroundColor: "#FFC107", color: "#000", "&:hover": { backgroundColor: "#FFB300" } }}>
              Upraviť profil
              </Button>
              <Button variant="contained" onClick={handleLogout} sx={{ borderRadius: 2, backgroundColor: "#D32F2F", color: "#fff", "&:hover": { backgroundColor: "#B71C1C" } }}>
              Odhlásiť sa z účtu
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default UserProfilePage;
