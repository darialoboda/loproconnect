export async function getData(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

export const apiUrl = {
    courses: 'http://localhost:5000/courses',
    courseById: 'http://localhost:5000/courses/',
    testsByCourse: '/api/tests/course/'
}


export function extractYouTubeVideoId(url) {
    const match = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/);
    return match ? match[1] : null;
}