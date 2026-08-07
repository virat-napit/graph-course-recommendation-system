import API from '../api/api';

const demoRecommendations = {
  default: [
    { id: 1, name: 'Graph Algorithms', description: 'Recommended based on graph traversal patterns.' },
    { id: 2, name: 'Advanced Database Design', description: 'Suggested for students with strong data modeling skills.' },
  ],
};

export const getRecommendations = async (studentId) => {
  try {
    const response = await API.get(`/recommendations/${studentId}`);
    const data = response?.data;

    if (Array.isArray(data)) {
      return { data, fromFallback: false };
    }

    throw new Error(data?.message || 'Unexpected recommendation payload');
  } catch (error) {
    console.warn('No recommendations found or backend unavailable.', error);
    return { data: [], fromFallback: true, error: error.message };
  }
};