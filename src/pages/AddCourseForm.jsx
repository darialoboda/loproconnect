import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, TextField, MenuItem, IconButton, Typography } from "@mui/material";
import { PhotoCamera, AttachFile } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "../components/Container";
import { RichTextEditor } from "@mantine/rte";
import parse from "html-react-parser";
import "../styles/RichTextStyles.css";

export default function AddCourseForm() {
  const CourseSchema = Yup.object().shape({
    title: Yup.string().required("Názov kurzu je povinný").max(100, "Názov kurzu môže mať maximálne 100 znakov"),
    description: Yup.string().max(500, "Popis kurzu môže mať maximálne 500 znakov"),
    videoLink: Yup.string(),
    img: Yup.mixed().nullable(),
    files: Yup.mixed().nullable(),
    article: Yup.string().max(1000, "Článok môže mať maximálne 1000 znakov"),
    publish: Yup.string().required("Vyberte možnosť publikovania").oneOf(["yes", "no"], "Publikovanie musí byť 'yes' alebo 'no'")
  });

  function handleSubmit(values, { resetForm }) {
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
      .then((response) => {
        if (response.ok) {
          toast.success("Kurz bol úspešne pridaný");
          resetForm();
        } else {
          toast.error("Nepodarilo sa pridať kurz");
        }
      })
      .catch((error) => {
        console.error("Chyba pri pridávaní kurzu:", error);
        toast.error("Chyba pri pridávaní kurzu");
      });
  }

  const RichTextDisplay = ({ article }) => (
    <div className="rich-text-container typography">
      {parse(article)}
    </div>
  );

  return (
    <section className="page-courses">
      <Container>
        <div className="content-hold">
          <div className="content">
            <Typography variant="h4" component="h1" gutterBottom>
              Add Course
            </Typography>

            <Formik
              initialValues={{
                title: "",
                description: "",
                videoLink: "",
                img: null,
                files: null,
                article: "",
                createdBy: "1",
                publish: "no",
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


                  <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Typography variant="body1">Obrázok kurzu:</Typography>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                    >
                      <PhotoCamera />
                      <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={(event) => setFieldValue("img", event.currentTarget.files[0])}
                      />
                    </IconButton>
                  </div>

                  <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Typography variant="body1">Súbory kurzu (voliteľné):</Typography>
                    <IconButton
                      color="primary"
                      aria-label="upload files"
                      component="label"
                    >
                      <AttachFile />
                      <input
                        hidden
                        type="file"
                        multiple
                        onChange={(event) => setFieldValue("files", event.currentTarget.files)}
                      />
                    </IconButton>
                  </div>

                  <div className="form-group">
                    <Typography variant="body1">Článok:</Typography>
                    <RichTextEditor
                      value={values.article}
                      onChange={(value) => setFieldValue("article", value)}
                       controls={[
                        ['bold', 'italic', 'underline', 'strike', 'clean'],
                        ['h3', 'h4'],
                        ['unorderedList', 'orderedList'], // Списки
                        ['link', 'image'],
                      ]}
                    />
                    <Typography variant="body2" color="textSecondary" style={{ marginTop: "10px" }}>
                      Náhľad článku:
                    </Typography>
                    <RichTextDisplay article={values.article} />
                  </div>


                  <div className="form-group">
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>

            <ToastContainer />
          </div>
        </div>
      </Container>
    </section>
  );
}
