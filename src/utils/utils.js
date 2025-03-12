export async function getData(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

export const apiUrl = {
    courses: 'http://localhost:5600/courses',
    courseById: 'http://localhost:5600/courses/',
    courseTeacher: 'http://localhost:5600/courses/teacher/',
    tests: 'http://localhost:5600/tests/',
    testsByCourse: 'http://localhost:5600/tests/course/',
    saveTestResults: 'http://localhost:5600/tests/save',
    users: 'http://localhost:5600/users',
    register: 'http://localhost:5600/users/register',
    login: 'http://localhost:5600/users/login',
    auth: 'http://localhost:5600/users/auth',
    usersAnswers: 'http://localhost:5600/users/answers/',
    usersTeacherStudents: 'http://localhost:5600/users/teacher/students/',
    teacherAnalytics: 'http://localhost:5600/users/teacher/analytics/',
}


export function extractYouTubeVideoId(url) {
    const match = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/);
    return match ? match[1] : null;
}
  