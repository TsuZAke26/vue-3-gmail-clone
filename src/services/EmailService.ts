import axios from 'axios';

import Email from '@/interfaces/IEmail';

const BASE_URL = 'http://localhost:3000';

const emailApiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

async function getEmail(): Promise<Email[]> {
  // Destrucutre "data" property from response
  // and give it the name "emails"
  const { data: emails } = await emailApiClient.get('/emails');
  return emails;
}

async function updateEmail(email: Email): Promise<void> {
  await emailApiClient
    .put(`/emails/${email.id}`, email)
    .catch(error => console.error(error));
}

export default {
  getEmail,
  updateEmail
};
