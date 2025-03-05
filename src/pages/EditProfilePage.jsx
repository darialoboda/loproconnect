import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";


const EditProfilePage = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Meno je povinné"),
    email: Yup.string().email("Nesprávny formát e-mailu").required("Email обов'язковий"),
    password: Yup.string().min(6, "Heslo musí mať aspoň 6 znakov"),
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSubmit = (values) => {
    updateUser({
      name: values.name,
      email: values.email,
      password: values.password,
    });
    navigate("/profile");
  };

  return (
    <div className="edit-container profile-edit">
      <div className="card">
        <h2 className="title">Upraviť profil</h2>
        <Formik
          initialValues={{
            name: user?.name || "",
            email: user?.email || "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="form">
              <Field name="name" type="text" placeholder="Ім'я" className={touched.name && errors.name ? "input error" : "input"} />
              {touched.name && errors.name && <div className="error-text">{errors.name}</div>}
              
              <Field name="email" type="email" placeholder="Email" className={touched.email && errors.email ? "input error" : "input"} />
              {touched.email && errors.email && <div className="error-text">{errors.email}</div>}
              
              <Field name="password" type="password" placeholder="Новий пароль" className={touched.password && errors.password ? "input error" : "input"} />
              {touched.password && errors.password && <div className="error-text">{errors.password}</div>}
              
              <div className="buttons">
                <button type="submit" className="btn save">Uložiť</button>
                <button type="button" className="btn cancel" onClick={() => navigate("/profile")}>
                  Zrušiť
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditProfilePage;
