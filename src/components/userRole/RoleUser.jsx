import React, { useEffect, useState } from "react";
import { Typography, Box, CircularProgress, List, ListItem, ListItemText } from "@mui/material";
import { toast } from "react-toastify";
import { apiUrl, getData } from "../../utils/utils";
import { useAuth } from "../../context/AuthContext";

export default function RoleUser() {
  const { user } = useAuth();
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUserAnswers();
    }
  }, [user]);

  const fetchUserAnswers = async () => {
    try {
      const data = await getData(`${apiUrl.usersAnswers}${user.id}`);
      
      if (!data.answers) throw new Error("Немає даних відповідей");

      const processedData = data.answers.map(answer => {
        const parsedAnswers = JSON.parse(answer.answers);
        const correctCount = parsedAnswers.filter(item => item.isCorrect).length;
        const totalCount = parsedAnswers.length;
        const successRate = Math.round((correctCount / totalCount) * 100);

        return {
          courseTitle: answer.course_title,
          successRate
        };
      });

      setAnswers(processedData);
    } catch (error) {
      console.error("Помилка отримання відповідей:", error);
      setError("Не вдалося завантажити відповіді.");
      toast.error("Не вдалося завантажити відповіді.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Ваші відповіді
      </Typography>
      {answers.length === 0 ? (
        <Typography color="textSecondary">Немає відповідей</Typography>
      ) : (
        <List>
          {answers.map((answer, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={answer.courseTitle}
                secondary={`Успішність: ${answer.successRate}%`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
