import API from '../api/api';

const demoStudents = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', department: 'Computer Science' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', department: 'Data Science' },
  { id: 3, name: 'Carla Gomez', email: 'carla@example.com', department: 'Software Engineering' },
];

export const getAllStudents = async () => {
  try {
    const response = await API.get('/students');
    const data = response?.data;

    if (Array.isArray(data)) {
      return response;
    }

    throw new Error(data?.message || 'Unexpected student payload');
  } catch (error) {
    console.warn('Backend unavailable, using demo student data.', error);
    return { data: demoStudents, fromFallback: true };
  }
};

export const getStudentById = async (id) => {
  try {
    const response = await API.get(`/students/${id}`);
    const data = response?.data;

    if (data && typeof data === 'object' && !Array.isArray(data)) {
      return response;
    }

    throw new Error(data?.message || 'Unexpected student payload');
  } catch (error) {
    console.warn('Backend unavailable, using demo student data.', error);
    const student = demoStudents.find((item) => String(item.id) === String(id));
    return { data: student || null, fromFallback: true };
  }
};

export const createStudent = (studentData) => API.post('/students', studentData);
export const updateStudent = (id, studentData) => API.put(`/students/${id}`, studentData);
export const deleteStudent = (id) => API.delete(`/students/${id}`);

