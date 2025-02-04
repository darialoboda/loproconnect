import React from 'react';
import { Formik, FieldArray, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';

const AddTestForm = () => {
  const initialValues = {
    course_id: '',
    title: '',
    questions: [
      {
        questionText: '',
        options: ['', '', '', ''],
        correctAnswer: '',
      },
    ],
  };

  const validationSchema = Yup.object({
    course_id: Yup.number().required('Required'),
    title: Yup.string().required('Required'),
    questions: Yup.array()
      .of(
        Yup.object({
          questionText: Yup.string().required('Required'),
          options: Yup.array().of(Yup.string().required('Required')),
          correctAnswer: Yup.string().required('Required'),
        })
      )
      .required('Must have at least one question'),
  });

  const onSubmit = (values) => {
    console.log(values);
    // Тут можна додати логіку для відправки даних на сервер
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add New Test
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, errors, touched }) => (
            <Form>
              <Field name="course_id">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Course ID"
                    fullWidth
                    margin="normal"
                    error={touched.course_id && !!errors.course_id}
                    helperText={touched.course_id && errors.course_id}
                  />
                )}
              </Field>
              <Field name="title">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Test Title"
                    fullWidth
                    margin="normal"
                    error={touched.title && !!errors.title}
                    helperText={touched.title && errors.title}
                  />
                )}
              </Field>
              <FieldArray name="questions">
                {({ push, remove }) => (
                  <>
                    {values.questions.map((question, index) => (
                      <Box key={index} sx={{ mt: 2, p: 2, border: '1px solid #ccc' }}>
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
                        {question.options.map((option, optionIndex) => (
                          <Field key={optionIndex} name={`questions.${index}.options.${optionIndex}`}>
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
                        ))}
                        <Field name={`questions.${index}.correctAnswer`}>
                          {({ field }) => (
                            <TextField
                              {...field}
                              label="Correct Answer"
                              fullWidth
                              margin="normal"
                              error={
                                touched.questions?.[index]?.correctAnswer &&
                                !!errors.questions?.[index]?.correctAnswer
                              }
                              helperText={
                                touched.questions?.[index]?.correctAnswer &&
                                errors.questions?.[index]?.correctAnswer
                              }
                            />
                          )}
                        </Field>
                        <Button
                          type="button"
                          variant="outlined"
                          color="secondary"
                          onClick={() => remove(index)}
                          sx={{ mt: 2 }}
                        >
                          Remove Question
                        </Button>
                      </Box>
                    ))}
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        push({
                          questionText: '',
                          options: ['', '', '', ''],
                          correctAnswer: '',
                        })
                      }
                      sx={{ mt: 2 }}
                    >
                      Add Question
                    </Button>
                  </>
                )}
              </FieldArray>
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default AddTestForm;