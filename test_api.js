const axios = require('axios');

const API = 'http://localhost:5050/api';
let token = '';
let postId = '';
const uniqueEmail = `john${Date.now()}@example.com`;

async function run() {
  try {
    // 1. Register
    console.log('Registering user...');
    let res = await axios.post(`${API}/auth/register`, {
      firstName: 'John',
      lastName: 'Doe',
      email: uniqueEmail,
      password: 'securePassword123',
      dateOfBirth: '1990-01-15',
      gender: 'male'
    });
    console.log('Register:', res.data);
    token = res.data.token;

    // 2. Login
    console.log('Logging in...');
    res = await axios.post(`${API}/auth/login`, {
      email: uniqueEmail,
      password: 'securePassword123'
    });
    console.log('Login:', res.data);
    token = res.data.token;

    // 3. Create Post
    console.log('Creating post...');
    res = await axios.post(`${API}/posts`, {
      content: 'Hello, this is my first post!',
      media: [],
      privacy: 'public'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Create Post:', res.data);
    postId = res.data.post.id;

    // 4. Get Feed
    console.log('Getting feed...');
    res = await axios.get(`${API}/posts/feed`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Feed:', res.data);

    // 5. Add Comment
    console.log('Adding comment...');
    res = await axios.post(`${API}/posts/${postId}/comments`, {
      content: 'Nice post!',
      parentCommentId: null,
      mentions: []
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Add Comment:', res.data);

    // 6. Get Comments
    console.log('Getting comments...');
    res = await axios.get(`${API}/posts/${postId}/comments`);
    console.log('Comments:', res.data);

    // 7. React to Post
    console.log('Reacting to post...');
    res = await axios.post(`${API}/posts/${postId}/react`, {
      reaction: 'like'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('React:', res.data);

    // 8. Get Reactions
    console.log('Getting reactions...');
    res = await axios.get(`${API}/posts/${postId}/reactions`);
    console.log('Reactions:', res.data);

    // 9. Remove Reaction
    console.log('Removing reaction...');
    res = await axios.delete(`${API}/posts/${postId}/react`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Remove Reaction:', res.data);

    console.log('\nAll API tests passed!');
  } catch (err) {
    if (err.response) {
      console.error('API Error:', err.response.data);
      console.error('Status:', err.response.status);
      console.error('Headers:', err.response.headers);
    } else {
      console.error('Error:', err.message);
      console.error(err.stack);
    }
    process.exit(1);
  }
}

run(); 