import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const emailApiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

async function getEmail() {
  const { data: emails } = await emailApiClient.get('/emails');
  return emails;
}

function updateEmail(email: any) {
  emailApiClient
    .put(`/emails/${email.id}`, email)
    .catch(error => console.error(error));
}

export default {
  getEmail,
  updateEmail
};
