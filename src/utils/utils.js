export async function getData(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

export const apiUrl = {
    courses: 'http://localhost:5000/courses',
    courseById: 'http://localhost:5000/courses/',
    tests: 'http://localhost:5000/tests/',
    testsByCourse: 'http://localhost:5000/tests/course/',
    saveTestResults: 'http://localhost:5000/tests/save',
    users: 'http://localhost:5000/users',
    register: 'http://localhost:5000/users/register',
    login: 'http://localhost:5000/users/login',
    auth: 'http://localhost:5000/users/auth',
}


export function extractYouTubeVideoId(url) {
    const match = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/);
    return match ? match[1] : null;
}