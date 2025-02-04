import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Paper, Typography, Radio, FormControlLabel, RadioGroup, Box, IconButton } from '@mui/material';
import { FaSun, FaMoon } from 'react-icons/fa';

// Приклад даних для тесту (можна замінити на дані з API або бази даних)
const testData = {
  title: "Test",
  questions: [
    {
      id: 1,
      questionText: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: "Paris",
    },
    {
      id: 2,
      questionText: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars",
    },
    {
      id: 3,
      questionText: "Who wrote 'To Kill a Mockingbird'?",
      options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"],
      correctAnswer: "Harper Lee",
    },
    {
      id: 4,
      questionText: "What is the largest ocean on Earth?",
      options: ["Atlantic", "Indian", "Arctic", "Pacific"],
      correctAnswer: "Pacific",
    },
    {
      id: 5,
      questionText: "What is the chemical symbol for water?",
      options: ["H2O", "CO2", "O2", "NaCl"],
      correctAnswer: "H2O",
    },
  ],
};

// Валідація для форми
const validationSchema = Yup.object().shape({
  answers: Yup.array()
    .of(Yup.string().required("You must select an answer"))
    .required("You must answer all questions"),
});

const TestPage = () => {
  const initialValues = {
    answers: Array(testData.questions.length).fill(""), // Масив для зберігання відповідей
  };

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true"; // Завантаження стану теми
  });

  const toggleTheme = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode); // Збереження в localStorage
      return newMode;
    });
  };

  useEffect(() => {
    // Додавання або видалення класу в body
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const handleSubmit = (values) => {
    console.log("Submitted Answers:", values.answers);
    // Тут можна додати логіку для перевірки відповідей або відправки на сервер
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ mt: 8, p: 4, backgroundColor: darkMode ? '#000' : '#fff', color: darkMode ? '#fff' : '#000' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" align="center" gutterBottom>
            {testData.title}
          </Typography>
          <IconButton onClick={toggleTheme} color="inherit">
            {darkMode ? <FaSun /> : <FaMoon />}
          </IconButton>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched }) => (
            <Form>
              {testData.questions.map((question, index) => (
                <Box key={question.id} sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    {index + 1}. {question.questionText}
                  </Typography>
                  <Field name={`answers[${index}]`}>
                    {({ field }) => (
                      <RadioGroup {...field}>
                        {question.options.map((option, optionIndex) => (
                          <FormControlLabel
                            key={optionIndex}
                            value={option}
                            control={<Radio />}
                            label={option}
                            sx={{ color: darkMode ? '#fff' : '#000' }}
                          />
                        ))}
                      </RadioGroup>
                    )}
                  </Field>
                  <ErrorMessage
                    name={`answers[${index}]`}
                    component="div"
                    className="error-message"
                    style={{ color: 'red', fontSize: '0.875rem' }}
                  />
                </Box>
              ))}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3 }}
              >
                Підтвердити
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default TestPage;