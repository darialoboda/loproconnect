import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Paper, Typography, Radio, FormControlLabel, RadioGroup, Box, Modal } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useParams, useNavigate } from 'react-router-dom';
import { apiUrl, getData } from '../utils/utils';

const TestPage = () => {
  const [test, setTest] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

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
      .of(Yup.string().required("Musíte vybrať odpoveď"))
      .required("Musíte odpovedať na všetky otázky"),
  });

  const handleSubmit = async (values) => {
    let correctCount = 0;

    const userAnswers = test.questions.map((question, index) => {
      const userAnswer = values.answers[index];
      const isCorrect = userAnswer === question.options[question.correctAnswerIndex];

      if (isCorrect) {
        correctCount++;
      }
      return {
        questionId: question.id,
        selectedAnswer: userAnswer,
        correctAnswerIndex: question.correctAnswerIndex,
        isCorrect,
      };
    });

    const calculatedScore = ((correctCount / test.questions.length) * 100).toFixed(2);
    setScore(calculatedScore);
    setSubmitted(true);
    setOpen(true);

    try {
      await fetch(`${apiUrl.saveTestResults}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          test_id: test.id,
          user_id: 1,
          answers: userAnswers,
        }),
      });
    } catch (error) {
      console.error("Error saving answers:", error);
    }
  };

  if (!test) return <Typography variant="h5" align="center">Načítava sa test...</Typography>;

  const data = [
    { name: 'Správne odpovede', value: Number(score) },
    { name: 'Nesprávne odpovede', value: 100 - Number(score) }
  ];
  const COLORS = ['#4CAF50', '#F44336'];

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
                        {question.options.map((option, optionIndex) => (
                          <FormControlLabel
                            key={optionIndex}
                            value={option}
                            control={<Radio />}
                            label={option}
                          />
                        ))}
                      </RadioGroup>
                    )}
                  </Field>
                </Box>
              ))}
              {!submitted && (
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                  Potvrdiť odoslanie
                </Button>
              )}
            </Form>
          )}
        </Formik>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button variant="contained" color="secondary" onClick={() => navigate(`/courses/${test.coursesId}`)}>
            Назад до курсу
          </Button>
          <Button variant="contained" color="primary" onClick={() => navigate(`/edit-test/${test.id}`)}>
            Редагувати тест
          </Button>
        </Box>
      </Paper>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', p: 4, width: 400, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>Váš výsledok: {score}%</Typography>
          <PieChart width={300} height={300}>
            <Pie data={data} cx={150} cy={150} innerRadius={60} outerRadius={80} fill="#8884d8" dataKey="value" label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <Button variant="contained" onClick={() => setOpen(false)}>Zatvoriť</Button>
        </Paper>
      </Modal>
    </Container>
  );
};

export default TestPage;
