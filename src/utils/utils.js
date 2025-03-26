export async function getData(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

export async function postData(url, data) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error('Failed to send data');
    }

    const responseData = await res.json();
    return responseData;
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
    adminTeachersUnpublish: 'http://localhost:5600/users/admin/teachers',
}


export function extractYouTubeVideoId(url) {
    const match = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/);
    return match ? match[1] : null;
}


export function getStatusColor (status) {
    switch (status) {
      case 'yes':
        return 'Publikované';
      case 'no':
        return 'Nezverejnené';
      case 'canceled':
        return 'Zrušené';
      default:
        return '-';
    }
  };