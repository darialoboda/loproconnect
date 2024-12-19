export async function getData(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

export const apiUrl = {
    courses: 'http://localhost:5000/courses',
    courseById: 'http://localhost:5000/courses/',
}
