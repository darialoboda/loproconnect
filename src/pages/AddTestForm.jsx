import React, { useEffect, useState } from "react";
import { Formik, FieldArray, Form, Field } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
  FormControlLabel,
  RadioGroup,
  Radio,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { apiUrl, getData } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AddTestForm = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const { user, canRender } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    async function fetchCourses() {
      const data = await getData((user?.role === 'admin') ? apiUrl.courses : apiUrl.courseTeacher + user.id);
      setCourses(data);
    }

    if(user) {
      fetchCourses();
    }
  }, []);

  const initialValues = {
    course_id: "",
    questions: [
      {
        questionText: "",
        options: ["", "", "", ""],
        correctAnswerIndex: 0,
      },
    ],
  };

  const validationSchema = Yup.object({
    course_id: Yup.string().required("Required"),
    questions: Yup.array()
      .of(
        Yup.object({
          questionText: Yup.string().required("Required"),
          options: Yup.array().of(Yup.string().required("Required")),
          correctAnswerIndex: Yup.number().required("Required"),
        })
      )
      .required("Musí obsahovať aspoň jednu otázku"),
  });

  const onSubmit = async (values) => {
    try {
      const response = await fetch(apiUrl.tests, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        navigate(`/course/${values.course_id}`);
      }
    } catch (error) {
      console.error("Error adding test:", error);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
        Pridaj nový test
        </Typography>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <FormControl fullWidth margin="normal" error={touched.course_id && !!errors.course_id}>
                <InputLabel>Course</InputLabel>
                <Field name="course_id" as={Select} label="Course">
                  {courses.map((course) => (
                      <MenuItem key={course.id} value={course.id}>
                        {course.title}
                      </MenuItem>
                  ))}
                </Field>
              </FormControl>
              <FieldArray name="questions">
                {({ push, remove }) => (
                  <>
                    {values.questions.map((question, index) => (
                      <Box key={index} sx={{ mt: 2, p: 2, border: "1px solid #ccc" }}>
                        <Typography variant="h6">Question {index + 1}</Typography>
                        <Field name={`questions.${index}.questionText`}>
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Question Text"
                              fullWidth
                              margin="normal"
                              error={
                                touched.questions?.[index]?.questionText &&
                                !!errors.questions?.[index]?.questionText
                              }
                              helperText={
                                touched.questions?.[index]?.questionText &&
                                errors.questions?.[index]?.questionText
                              }
                            />
                          )}
                        </Field>
                        <RadioGroup
                          value={values.questions[index].correctAnswerIndex}
                          onChange={(e) =>
                            setFieldValue(
                              `questions.${index}.correctAnswerIndex`,
                              parseInt(e.target.value)
                            )
                          }
                        >
                          {question.options.map((option, optionIndex) => (
                            <Box key={optionIndex} sx={{ display: "flex", alignItems: "center" }}>
                              <FormControlLabel control={<Radio value={optionIndex} />} />
                              <Field name={`questions.${index}.options.${optionIndex}`}>
                                {({ field }) => (
                                  <TextField
                                    {...field}
                                    label={`Option ${optionIndex + 1}`}
                                    fullWidth
                                    margin="normal"
                                    error={
                                      touched.questions?.[index]?.options?.[optionIndex] &&
                                      !!errors.questions?.[index]?.options?.[optionIndex]
                                    }
                                    helperText={
                                      touched.questions?.[index]?.options?.[optionIndex] &&
                                      errors.questions?.[index]?.options?.[optionIndex]
                                    }
                                  />
                                )}
                              </Field>
                            </Box>
                          ))}
                        </RadioGroup>
                        <Button
                          type="button"
                          variant="outlined"
                          color="secondary"
                          onClick={() => remove(index)}
                          sx={{ mt: 2 }}
                        >
                          Odstrániť otázku
                        </Button>
                      </Box>
                    ))}
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        push({
                          questionText: "",
                          options: ["", "", "", ""],
                          correctAnswerIndex: 0,
                        })
                      }
                      sx={{ mt: 2 }}
                    >
                      Pridať otázku
                    </Button>
                  </>
                )}
              </FieldArray>
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
              Odoslať
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default AddTestForm;