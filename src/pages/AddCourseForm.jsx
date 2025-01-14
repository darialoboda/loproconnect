import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, TextField, MenuItem } from "@mui/material";
import Container from "../components/Container";




export default function AddCourseForm() {
  const CourseSchema = Yup.object().shape({
    title: Yup.string().required("Názov kurzu je povinný").max(100, "Názov kurzu môže mať maximálne 100 znakov"),
    description: Yup.string().max(500, "Popis kurzu môže mať maximálne 500 znakov"),
    videoLink: Yup.string().url("Musí byť platná URL adresa"),
    img: Yup.mixed().nullable(),
    files: Yup.mixed().nullable(),
    article: Yup.string().max(1000, "Článok môže mať maximálne 1000 znakov"),
    publish: Yup.string().required("Vyberte možnosť publikovania").oneOf(["yes", "no"], "Publikovanie musí byť 'yes' alebo 'no'")
  });

  function handleSubmit(values, { resetForm }) {
    console.log(values);
    

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("videoLink", values.videoLink);
    formData.append("publish", values.publish);
    formData.append("img", values.img);
    if (values.files) {
      Array.from(values.files).forEach((file) => {
        formData.append(`files`, file);
      });
    }
    formData.append("article", values.article);
    formData.append("createdBy", values.createdBy);

    fetch("http://localhost:5000/courses", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        resetForm();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <section className="page-courses">
      <Container>
        <div className="content-hold">
          <div className="content">
            <h1 className="form-title">Add course</h1>

            <Formik
              initialValues={{
                title: "",
                description: "",
                videoLink: "",
                img: null,
                files: null,
                article: "",
                createdBy: "1",
                publish: "no"
              }}
              validationSchema={CourseSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, setFieldValue }) => (
                <Form>
                  <div className="form-group">
                    <Field
                      name="title"
                      as={TextField}
                      label="Názov kurzu"
                      fullWidth
                      error={touched.title && !!errors.title}
                      helperText={<ErrorMessage name="title" />}
                    />
                  </div>

                  <div className="form-group">
                  <TextField
                    fullWidth
                    margin="normal"
                    select
                    name="publish"
                    label="Publikovať"
                    value={values.publish}
                    onChange={(event) => setFieldValue("publish", event.target.value)}
                    error={touched.publish && Boolean(errors.publish)}
                    helperText={touched.publish && errors.publish}
                  >
                    <MenuItem value="no">No</MenuItem>
                    <MenuItem value="yes">Yes</MenuItem>
                  </TextField>
                  </div>

                  <div className="form-group">
                    <Field
                      name="videoLink"
                      as={TextField}
                      label="Odkaz na video (voliteľné)"
                      fullWidth
                      error={touched.videoLink && !!errors.videoLink}
                      helperText={<ErrorMessage name="videoLink" />}
                    />
                  </div>

                  <div className="form-group">
                    <Field
                      name="description"
                      as={TextField}
                      label="Popis kurzu"
                      multiline
                      rows={4}
                      fullWidth
                      error={touched.description && !!errors.description}
                      helperText={<ErrorMessage name="description" />}
                    />
                  </div>

                  <div className="form-group">
                    <Field
                      name="article"
                      as={TextField}
                      label="Článok"
                      multiline
                      rows={6}
                      fullWidth
                      error={touched.article && !!errors.article}
                      helperText={<ErrorMessage name="article" />}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="">Obrázok kurzu:</label>
                    <label className="cta-button">
                      Виберіть картинку
                      <input
                        type="file"
                        name="img"
                        accept="image/*"
                        className="hide"
                        onChange={(event) =>
                          setFieldValue("img", event.currentTarget.files[0])
                        }
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <label>Súbory kurzu (voliteľné):</label>
                    <label className="cta-button">
                      Виберіть файли
                      <input
                        type="file"
                        name="files"
                        className="hide"
                        multiple
                        onChange={(event) =>
                          setFieldValue("files", event.currentTarget.files)
                        }
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Container>
    </section>
  );
}
