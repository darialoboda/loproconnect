import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
} from "@mui/material";
import Container from "../components/Container";

export default function AddCourseForm() {
  const CourseSchema = Yup.object().shape({
    title: Yup.string()
      .required("Názov kurzu je povinný")
      .max(100, "Názov kurzu môže mať maximálne 100 znakov"),
    description: Yup.string()
      .required("Popis kurzu je povinný")
      .max(500, "Popis kurzu môže mať maximálne 500 znakov"),
    videoLink: Yup.string().url("Musí byť platná URL adresa"),
    img: Yup.mixed(),
    files: Yup.mixed(),
  });

  function handleSubmit (values, { resetForm }) {
    
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("videoLink", values.videoLink);
    formData.append("img", values.img);
    if (values.files) {
      Array.from(values.files).forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });
    }
    formData.append("createdBy", values.createdBy);

    // Відправка даних на сервер
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
                createdBy: "1",
              }}
              // validationSchema={CourseSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form>
                  <Field
                    name="title"
                    label="Názov kurzu"
                    margin="normal"
                    className="input"
                  />
                  <Field
                    name="description"
                    label="Popis kurzu"
                    type="textarea"
                    rows={4}
                    margin="normal"
                    className="input"
                  />
                  <Field
                    name="videoLink"
                    label="Odkaz na video (voliteľné)"
                    margin="normal"
                    className="input"
                  />
                  <div style={{ marginBottom: "16px" }}>
                    <label>Obrázok kurzu:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        setFieldValue("img", event.currentTarget.files[0])
                      }
                    />
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <label>Súbory kurzu (voliteľné):</label>
                    <input
                      type="file"
                      multiple
                      onChange={(event) =>
                        setFieldValue("files", event.currentTarget.files)
                      }
                    />
                  </div>
                  <button type="submit">Submit</button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Container>
    </section>
  );
}











// const AddCourseForm2 = ({ onAddCourse }) => {
//   const [open, setOpen] = useState(false);

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <Button
//   variant="contained"
//   color="primary"
//   onClick={handleOpen}
//   sx={{
//     margin: "20px 0",
//     padding: "12px 24px", // Adjusts the padding for better size
//     fontSize: "16px", // Increases the font size for readability
//     borderRadius: "8px", // Adds rounded corners
//     textTransform: "none", // Prevents the text from being uppercased
//     transition: "background-color 0.3s ease", // Smooth transition for background color
//     "&:hover": {
//       backgroundColor: "#3f51b5", // Adjust hover background color for a subtle effect
//     },
//   }}
// >
//   Pridať nový kurz
// </Button>

//       <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//         <DialogTitle>Pridať nový kurz</DialogTitle>
        
//       </Dialog>
//     </div>
//   );
// };

// const CoursesPage = () => {
//   const [courses, setCourses] = useState([]);

//   const handleAddCourse = (newCourse) => {
//     setCourses((prevCourses) => [...prevCourses, newCourse]);
//   };

//   return (
//     <div>
//       <AddCourseForm2 onAddCourse={handleAddCourse} />
//       <div>
//         {courses.map((course, index) => (
//           <div key={index} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
//             <h3>{course.title}</h3>
//             <p>{course.description}</p>
//             {course.videoLink && (
//               <p>
//                 <strong>Odkaz na video:</strong> <a href={course.videoLink}>{course.videoLink}</a>
//               </p>
//             )}
//             {course.files && (
//               <p>
//                 <strong>Súbory:</strong> {course.files}
//               </p>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CoursesPage;
