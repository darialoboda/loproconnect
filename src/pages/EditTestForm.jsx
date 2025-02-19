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
} from "@mui/material";
import { apiUrl, getData } from "../utils/utils";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditTestForm = () => {
  const [test, setTest] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchTest() {
      const data = await getData(`${apiUrl.tests}/${id}`);
      setTest(data);
    }
    fetchTest();
  }, [id]);

  const validationSchema = Yup.object({
    questions: Yup.array()
      .of(
        Yup.object({
          questionText: Yup.string().required("Požadované"),
          options: Yup.array().of(Yup.string().required("Požadované")),
          correctAnswerIndex: Yup.number().required("Požadované"),
        })
      )
      .required("Musí obsahovať aspoň jednu otázku"),
  });

  const onSubmit = async (values) => {
    try {
      const response = await fetch(`${apiUrl.tests}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast.success("Test bol úspešne upravený!");
        setTimeout(() => {
          navigate(`/test/${id}`);
        }, 2000);
      }
    } catch (error) {
      toast.error("Chyba pri aktualizácii testu");
      console.error("Error updating test:", error);
    }
  };

  if (!test) return <Typography>Načítava sa...</Typography>;

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Upraviť test
        </Typography>
        <Formik initialValues={test} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
          {({ values, setFieldValue }) => (
            <Form>
              <FieldArray name="questions">
                {({ push, remove }) => (
                  <>
                    {values.questions.map((question, index) => (
                      <Box key={index} sx={{ mt: 2, p: 2, border: "1px solid #ccc" }}>
                        <Typography variant="h6">Otázka {index + 1}</Typography>
                        <Field name={`questions.${index}.questionText`} as={TextField} label="Text otázky" fullWidth margin="normal" />
                        <RadioGroup
                          value={values.questions[index].correctAnswerIndex}
                          onChange={(e) =>
                            setFieldValue(`questions.${index}.correctAnswerIndex`, parseInt(e.target.value))
                          }
                        >
                          {question.options.map((option, optionIndex) => (
                            <Box key={optionIndex} sx={{ display: "flex", alignItems: "center" }}>
                              <FormControlLabel control={<Radio value={optionIndex} />} />
                              <Field name={`questions.${index}.options.${optionIndex}`} as={TextField} label={`Možnosť ${optionIndex + 1}`} fullWidth margin="normal" />
                            </Box>
                          ))}
                        </RadioGroup>
                        <Button type="button" variant="outlined" color="secondary" onClick={() => remove(index)} sx={{ mt: 2 }}>
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
                Uložiť zmeny
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </Container>
  );
};

export default EditTestForm;
