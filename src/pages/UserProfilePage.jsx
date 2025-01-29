import React, { useState } from "react";
import EditProfileForm from "./EditProfileForm";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { deepPurple, yellow } from "@mui/material/colors";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000000",  // Чорний фон
      paper: "#000000",    // Трохи світліший для карток
    },
    text: {
      primary: "#ffffff",  // Білий текст
      secondary: "#bdbdbd", // Світло-сірий для допоміжного тексту
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const ProfilePage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const user = {
    name: "Daria Loboda",
    email: "loboda@example.com",
    role: "Študent",
    createdAt: "2024-01-01",
  };

  const handleProfileUpdate = (updatedProfile) => {
    console.log("Aktualizovaný profil:", updatedProfile);
    setIsEditing(false);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      {isEditing ? (
        <EditProfileForm
          initialValues={user}
          onSubmit={handleProfileUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "transparent",
            padding: 2,
          }}
        >
          <Card
            sx={{
              maxWidth: 900,
              width: "100%",
              boxShadow: darkMode ? 0 : 6,  // При темній темі без тіні
              borderRadius: 3,
              overflow: "hidden",
              backgroundColor: darkMode ? "#000000" : "#fff",  // Чорний для темної теми
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: yellow[700],
                padding: 3,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: deepPurple[300],
                  width: 120,
                  height: 120,
                  fontSize: "3rem",
                  border: `4px solid ${darkMode ? "#333" : "#fff"}`,
                }}
              >
                {user.name[0]}
              </Avatar>
            </Box>
            <Box sx={{ position: "absolute", top: 16, right: 16 }}>
              <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Box>
            <CardContent sx={{ padding: 4 }}>
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  fontFamily: "'Roboto Slab', serif",
                  color: darkMode ? yellow[200] : deepPurple[700],
                }}
              >
                {user.name}
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                align="center"
              >
                Email: {user.email}
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                align="center"
              >
                Rola: {user.role}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                align="center"
                sx={{ mt: 1 }}
              >
                Registrovaný: {user.createdAt}
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setIsEditing(true)}
                  sx={{
                    borderRadius: 2,
                    backgroundColor: "#FFC107",
                    color: "#000",
                    "&:hover": {
                      backgroundColor: "#FFB300",
                    },
                  }}
                >
                  Upraviť profil
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 2,
                    backgroundColor: "#D32F2F",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#B71C1C",
                    },
                  }}
                >
                  Odhlásiť sa
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}
    </ThemeProvider>
  );
};

export default ProfilePage;
