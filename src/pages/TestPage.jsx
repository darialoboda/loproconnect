import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getData } from '../utils/utils';

export default function TestPage() {
  const { courseId } = useParams();

  // Використання react-query для отримання тестових питань
  const { data: tests, isLoading, error } = useQuery(
    ['tests', courseId],
    () => getData(`${apiUrl.testsByCourse}${courseId}`)
  );

  if (isLoading) return <p>Завантаження тестових питань...</p>;
  if (error) return <p>Сталася помилка: {error.message}</p>;

  return (
    <div className="test-page">
      <h2>Тести для курсу #{courseId}</h2>
      <ul className="test-list">
        {tests.map((test) => (
          <li key={test.id} className="test-item">
            <h3>{test.title}</h3>
            <p>Питання: {test.questions}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
