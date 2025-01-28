import React from "react";
import { useParams } from "react-router-dom";

const TestPage = () => {
  const { id } = useParams(); // Отримуємо ID курсу з URL

  return (
    <div className="test-page">
      <h1>Тестування курсу {id}</h1>
      <p>Тут буде сторінка для тестування курсу. Це ваш курс з ID {id}.</p>
      {/* Додайте тестові питання або інші елементи для тестування */}
    </div>
  );
};

export default TestPage;
