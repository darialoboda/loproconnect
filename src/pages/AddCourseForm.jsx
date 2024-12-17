import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const CourseSchema = Yup.object().shape({
  title: Yup.string()
    .required("Názov kurzu je povinný")
    .max(100, "Názov kurzu môže mať maximálne 100 znakov"),
  description: Yup.string()
    .required("Popis kurzu je povinný")
    .max(500, "Popis kurzu môže mať maximálne 500 znakov"),
  videoLink: Yup.string().url("Musí byť platná URL adresa"),
  files: Yup.string(),
});

const AddCourseForm = ({ onAddCourse }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
  variant="contained"
  color="primary"
  onClick={handleOpen}
  sx={{
    margin: "20px 0",
    padding: "12px 24px", // Adjusts the padding for better size
    fontSize: "16px", // Increases the font size for readability
    borderRadius: "8px", // Adds rounded corners
    textTransform: "none", // Prevents the text from being uppercased
    transition: "background-color 0.3s ease", // Smooth transition for background color
    "&:hover": {
      backgroundColor: "#3f51b5", // Adjust hover background color for a subtle effect
    },
  }}
>
  Pridať nový kurz
</Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Pridať nový kurz</DialogTitle>
        <Formik
          initialValues={{
            title: "",
            description: "",
            videoLink: "",
            files: "",
          }}
          validationSchema={CourseSchema}
          onSubmit={(values, { resetForm }) => {
            onAddCourse(values);
            resetForm();
            handleClose();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <DialogContent>
                <Field
                  as={TextField}
                  name="title"
                  label="Názov kurzu"
                  fullWidth
                  margin="normal"
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                />
                <Field
                  as={TextField}
                  name="description"
                  label="Popis kurzu"
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
                <Field
                  as={TextField}
                  name="videoLink"
                  label="Odkaz na video (voliteľné)"
                  fullWidth
                  margin="normal"
                  error={touched.videoLink && Boolean(errors.videoLink)}
                  helperText={touched.videoLink && errors.videoLink}
                />
                <Field
                  as={TextField}
                  name="files"
                  label="Súbory (voliteľné)"
                  fullWidth
                  margin="normal"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="secondary">
                  Zrušiť
                </Button>
                <Button type="submit" color="primary" variant="contained">
                  Pridať kurz
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);

  const handleAddCourse = (newCourse) => {
    setCourses((prevCourses) => [...prevCourses, newCourse]);
  };

  return (
    <div>
      <AddCourseForm onAddCourse={handleAddCourse} />
      <div>
        {courses.map((course, index) => (
          <div key={index} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            {course.videoLink && (
              <p>
                <strong>Odkaz na video:</strong> <a href={course.videoLink}>{course.videoLink}</a>
              </p>
            )}
            {course.files && (
              <p>
                <strong>Súbory:</strong> {course.files}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
