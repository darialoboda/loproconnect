import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Formik, Field, Form } from "formik";
import { TextField, Button, Box, Typography, Card, CardContent } from "@mui/material";
import { deepPurple, yellow } from "@mui/material/colors";
import * as Yup from "yup"; // Для валідації
import { toast } from "react-toastify";

const EditProfilePage = () => {
  const { user, updateUser } = useAuth(); // Потрібно створити updateUser функцію в контексті
  const navigate = useNavigate();

  // Валідація форми без підтвердження пароля
  const validationSchema = Yup.object({
    name: Yup.string().required("Meno je povinné"),
    email: Yup.string().email("Nesprávny formát e-mailu").required("Email обов'язковий"),
    role: Yup.string().required("Rola je povinná"),
    password: Yup.string().min(6, "Heslo musí mať aspoň 6 znakov"), // Пароль без підтвердження
  });

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Якщо користувач не автентифікований, перенаправляємо на сторінку входу
    }
  }, [user, navigate]);

  const handleSubmit = (values) => {
    // Оновлення профілю без необхідності оновлювати пароль
    updateUser({
      name: values.name,
      email: values.email,
      role: values.role,
      password: values.password, // Оновлення пароля
    });
    navigate("/profile"); // Після редагування повертаємось на сторінку профілю
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: 2 }}>
      <Card sx={{ maxWidth: 900, width: "100%", boxShadow: 6, borderRadius: 3, overflow: "hidden", backgroundColor: "#fff" }}>
        <CardContent sx={{ padding: 4 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, color: deepPurple[700] }}>
          Upraviť profil
          </Typography>

          <Formik
            initialValues={{
              name: user?.name || "",
              email: user?.email || "",
              role: user?.role || "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Field
                    name="name"
                    label="Ім'я"
                    variant="outlined"
                    component={TextField}
                    sx={{ width: "100%" }}
                    error={touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                  />
                  <Field
                    name="email"
                    label="Email"
                    variant="outlined"
                    component={TextField}
                    sx={{ width: "100%" }}
                    error={touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                  />
                  <Field
                    name="role"
                    label="Роль"
                    variant="outlined"
                    component={TextField}
                    sx={{ width: "100%" }}
                    error={touched.role && !!errors.role}
                    helperText={touched.role && errors.role}
                  />
                  <Field
                    name="password"
                    label="Новий пароль"
                    type="password"
                    variant="outlined"
                    component={TextField}
                    sx={{ width: "100%" }}
                    error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                  />
                  <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
                    <Button type="submit" variant="contained" color="primary" sx={{ backgroundColor: yellow[700], color: "#000" }}>
                    Uložiť
                    </Button>
                    <Button variant="outlined" onClick={() => navigate("/profile")} sx={{ color: deepPurple[700] }}>
                    Zrušiť
                    </Button>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditProfilePage;
