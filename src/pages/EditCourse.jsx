import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CourseSchema = Yup.object().shape({
  title: Yup.string().required("Názov je povinný"),
  description: Yup.string().required("Popis je povinný"),
  article: Yup.string().required("Článok je povinný"),
  videoLink: Yup.string().url("Musí to byť platná URL adresa videa"),
  publish: Yup.string().matches(/(yes|no)/, "Zadajte 'yes' alebo 'no'"),
  img: Yup.mixed(),
  files: Yup.mixed(),
});

export default function EditCourse() {
  const { id } = useParams(); // Získanie ID kurzu
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    // Načítanie úvodných údajov kurzu podľa ID
    fetch(`http://localhost:5000/courses/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setInitialValues({
          title: data.title,
          description: data.description,
          article: data.article,
          videoLink: data.videoLink,
          publish: data.publish,
          img: null,
          files: null,
        });
      })
      .catch((error) => console.error("Chyba pri načítaní údajov kurzu:", error));
  }, [id]);

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("article", values.article);
    formData.append("videoLink", values.videoLink);
    formData.append("publish", values.publish);
    if (values.img) {
      formData.append("img", values.img);
    }
    if (values.files) {
      Array.from(values.files).forEach((file) => formData.append("files", file));
    }

    fetch(`http://localhost:5000/courses/${id}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log("Kurz bol úspešne aktualizovaný");
          navigate(`/course/${id}`); // Presmerovanie na stránku kurzu
        } else {
          console.error("Nepodarilo sa aktualizovať kurz");
        }
      })
      .catch((error) => console.error("Chyba pri aktualizácii kurzu:", error));
  };

  if (!initialValues) {
    return <p>Načítavanie údajov kurzu...</p>;
  }

  return (
    <div className="edit-course-container" style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Úprava kurzu</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={CourseSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="edit-course-form" style={{ display: "grid", gap: "15px" }}>
            <div>
              <label htmlFor="title" style={{ fontWeight: "bold" }}>Názov kurzu:</label>
              <Field
                name="title"
                type="text"
                placeholder="Zadajte názov kurzu"
                className="form-input"
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
              />
              <ErrorMessage name="title" component="div" style={{ color: "red" }} />
            </div>

            <div>
              <label htmlFor="description" style={{ fontWeight: "bold" }}>Popis kurzu:</label>
              <Field
                name="description"
                as="textarea"
                placeholder="Zadajte popis kurzu"
                className="form-input"
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", minHeight: "80px" }}
              />
              <ErrorMessage name="description" component="div" style={{ color: "red" }} />
            </div>

            <div>
              <label htmlFor="article" style={{ fontWeight: "bold" }}>Článok:</label>
              <ReactQuill
                theme="snow"
                value={values.article}
                onChange={(content) => setFieldValue("article", content)}
                style={{ height: "200px", marginBottom: "20px" }}
              />
              <ErrorMessage name="article" component="div" style={{ color: "red" }} />
            </div>

            <div>
              <label htmlFor="videoLink" style={{ fontWeight: "bold" }}>Odkaz na video:</label>
              <Field
                name="videoLink"
                type="text"
                placeholder="Zadajte URL adresu videa"
                className="form-input"
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
              />
              <ErrorMessage name="videoLink" component="div" style={{ color: "red" }} />
            </div>

            <div>
              <label htmlFor="publish" style={{ fontWeight: "bold" }}>Publikovať (yes/no):</label>
              <Field
                name="publish"
                type="text"
                placeholder="Zadajte 'yes' alebo 'no'"
                className="form-input"
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
              />
              <ErrorMessage name="publish" component="div" style={{ color: "red" }} />
            </div>

            <div>
              <label htmlFor="img" style={{ fontWeight: "bold" }}>Vybrať obrázok:</label>
              <input
                type="file"
                onChange={(event) => setFieldValue("img", event.currentTarget.files[0])}
                style={{ margin: "10px 0" }}
              />
            </div>

            <div>
              <label htmlFor="files" style={{ fontWeight: "bold" }}>Pridať súbory:</label>
              <input
                type="file"
                multiple
                onChange={(event) => setFieldValue("files", event.currentTarget.files)}
                style={{ margin: "10px 0" }}
              />
            </div>

            <button
              type="submit"
              style={{
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#007BFF",
                color: "#fff",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Uložiť
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
