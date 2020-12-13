<template>
  <table class="mail-table">
    <tbody>
      <tr
        v-for="email in unarchivedEmails"
        :key="email.id"
        :class="['clickable', email.read ? 'read' : '']"
        @click="readEmail(email)"
      >
        <td><input type="checkbox" /></td>
        <td>{{ email.from }}</td>
        <td>
          <p>
            <strong>{{ email.subject }}</strong> - {{ email.body }}
          </p>
        </td>
        <td class="date">
          {{ format(new Date(email.sentAt), 'MMM dd, yyyy') }}
        </td>
        <td>
          <button @click="archiveEmail(email)">Archive</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { ref } from 'vue';
import { format } from 'date-fns';

import EmailService from '@/services/EmailService';

export default {
  async setup() {
    const emails = await EmailService.getEmail();

    return {
      format,
      emails: ref(emails)
    };
  },
  computed: {
    sortedEmails() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.emails.sort((email1, email2) => {
        return email1.sentAt < email2.sentAt ? 1 : -1;
      });
    },
    unarchivedEmails() {
      return this.sortedEmails.filter(email => !email.archived);
    }
  },
  methods: {
    readEmail(email) {
      email.read = true;
      EmailService.updateEmail(email);
    },
    archiveEmail(email) {
      email.archived = true;
      EmailService.updateEmail(email);
    }
  }
};
</script>
