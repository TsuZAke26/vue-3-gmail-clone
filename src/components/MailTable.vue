<template>
  <table class="mail-table">
    <tbody>
      <!-- Generate inbox row for each email present -->
      <tr
        v-for="email in unarchivedEmails"
        :key="email.id"
        :class="['clickable', email.read ? 'read' : '']"
        @click="openEmail(email)"
      >
        <!-- Select checkbox -->
        <td><input type="checkbox" /></td>

        <!-- From address -->
        <td>{{ email.from }}</td>

        <!-- Email subject & body preview -->
        <td>
          <p>
            <strong>{{ email.subject }}</strong> - {{ email.body }}
          </p>
        </td>

        <!-- Received date -->
        <td class="date">
          {{ format(new Date(email.sentAt), 'MMM dd, yyyy') }}
        </td>

        <!-- Archive email button -->
        <td>
          <button @click="archiveEmail(email)">Archive</button>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Full Email Display component -->
  <modal-view v-if="openedEmail" @closeModal="openedEmail = null">
    <mail-view :email="openedEmail" />
  </modal-view>
</template>

<script>
import { ref } from 'vue';
import { format } from 'date-fns';

import EmailService from '@/services/EmailService';
import MailView from './MailView.vue';
import ModalView from './ModalView.vue';

export default {
  components: { MailView, ModalView },
  async setup() {
    const emails = await EmailService.getEmail();

    return {
      format,
      emails: ref(emails),
      openedEmail: ref(null)
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
    async openEmail(email) {
      email.read = true;
      await EmailService.updateEmail(email);
      this.openedEmail = email;
    },
    async archiveEmail(email) {
      email.archived = true;
      await EmailService.updateEmail(email);
    }
  }
};
</script>
