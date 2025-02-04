import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Paper, Typography, Radio, FormControlLabel, RadioGroup, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { apiUrl, getData } from '../utils/utils';

const TestPage = () => {
  const [test, setTest] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchTestData() {
      try {
        const testData = await getData(`${apiUrl.tests}${id}`);
        setTest(testData);
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    }
    fetchTestData();
  }, [id]);

  const validationSchema = Yup.object().shape({
    answers: Yup.array()
      .of(Yup.string().required("Ви повинні вибрати відповідь"))
      .required("Ви повинні відповісти на всі питання"),
  });

  const handleSubmit = async (values) => {
    let correctCount = 0;

    // Створюємо новий масив для збереження відповідей з індексами
    const userAnswers = test.questions.map((question, index) => {
        const userAnswer = values.answers[index];
        const isCorrect = userAnswer === question.options[question.correctAnswerIndex];

        if (isCorrect) {
            correctCount++;
        }

        // Зберігаємо відповідь користувача разом з індексом відповіді
        return {
            questionId: question.id,  // Якщо питання має унікальний id, додаємо його
            selectedAnswer: userAnswer,
            correctAnswerIndex: question.correctAnswerIndex,
            isCorrect,
        };
    });

    // Рахуємо результат
    setScore(((correctCount / test.questions.length) * 100).toFixed(2));
    setSubmitted(true);

    // Зберігаємо відповіді у базі даних
    try {
        const response = await fetch(`${apiUrl.saveTestResults}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                test_id: test.id,
                user_id: 1,  // Тут вказуємо ID користувача, отриманий із сесії чи іншого джерела
                answers: userAnswers,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to save answers');
        }

        const result = await response.json();
        console.log(result.message);  // Логуємо повідомлення про успіх

    } catch (error) {
        console.error("Error saving answers:", error);
    }
};



  if (!test) return <Typography variant="h5" align="center">Завантаження тесту...</Typography>;

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={2} sx={{ mt: 8, p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>{test.title}</Typography>
        <Formik
          initialValues={{ answers: Array(test.questions.length).fill("") }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form>
              {test.questions.map((question, index) => (
                <Box key={index} sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    {index + 1}. {question.questionText}
                  </Typography>
                  <Field name={`answers[${index}]`}>
                    {({ field }) => (
                      <RadioGroup {...field}>
                        {question.options.map((option, optionIndex) => {
                          const isCorrect = option === question.options[question.correctAnswerIndex];
                          const isSelected = values.answers[index] === option;
                          const showFeedback = submitted && isSelected;

                          return (
                            <FormControlLabel
                              key={optionIndex}
                              value={option}
                              control={<Radio />}
                              label={option}
                              sx={{
                                color: showFeedback ? (isCorrect ? 'green' : 'red') : 'inherit',
                                textDecoration: submitted && isCorrect ? 'underline' : 'none',
                              }}
                            />
                          );
                        })}
                      </RadioGroup>
                    )}
                  </Field>
                </Box>
              ))}
              {!submitted && (
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                  Підтвердити
                </Button>
              )}
            </Form>
          )}
        </Formik>
        {submitted && (
          <Typography variant="h5" align="center" sx={{ mt: 4 }}>
            Ваш результат: {score}%
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default TestPage;
