import http from 'http';

const students = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', department: 'Computer Science' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', department: 'Data Science' },
  { id: 3, name: 'Carla Gomez', email: 'carla@example.com', department: 'Software Engineering' },
];

const recommendationsByStudent = {
  1: [
    { id: 1, name: 'Graph Algorithms', description: 'Recommended because of strong graph reasoning skills.' },
    { id: 2, name: 'Database Design', description: 'Recommended for data modeling and query planning.' },
  ],
  2: [
    { id: 3, name: 'Machine Learning Foundations', description: 'Recommended for analytical and statistical strengths.' },
  ],
  3: [
    { id: 4, name: 'Software Architecture', description: 'Recommended for system design and collaboration skills.' },
    { id: 5, name: 'Cloud Computing', description: 'Suggested for scalable application development interests.' },
  ],
};

const server = http.createServer((req, res) => {
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, 'https://graph-course-recommendation-system-1.onrender.com');

  if (req.method === 'GET' && url.pathname === '/api/students') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(students));
    return;
  }

  const recMatch = url.pathname.match(/^\/api\/recommendations\/(\d+)$/);
  if (req.method === 'GET' && recMatch) {
    const studentId = Number(recMatch[1]);
    const data = recommendationsByStudent[studentId] || [];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Not found' }));
});

server.listen(8080, () => {
  console.log('Backend running at https://graph-course-recommendation-system-1.onrender.com');
});
 