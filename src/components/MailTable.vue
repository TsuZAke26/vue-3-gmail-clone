<template>
  <table class="mail-table">
    <tbody>
      <!-- Generate inbox row for each email present -->
      <tr
        v-for="email in unarchivedEmails"
        :key="email.id"
        :class="['clickable', email.read ? 'read' : '']"
      >
        <!-- Select checkbox -->
        <td>
          <input
            type="checkbox"
            @click="emailSelection.toggle(email)"
            :selected="emailSelection.emails.has(email)"
          />
        </td>

        <!-- From address -->
        <td @click="openEmail(email)">{{ email.from }}</td>

        <!-- Email subject & body preview -->
        <td @click="openEmail(email)">
          <p>
            <strong>{{ email.subject }}</strong> - {{ email.body }}
          </p>
        </td>

        <!-- Received date -->
        <td class="date" @click="openEmail(email)">
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
    <mail-view :email="openedEmail" @changeEmail="changeEmail" />
  </modal-view>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { format } from 'date-fns';

import MailView from './MailView.vue';
import ModalView from './ModalView.vue';

import useEmailSelection from '@/composables/useEmailSelection';

import EmailService from '@/services/EmailService';

export default defineComponent({
  components: { MailView, ModalView },
  async setup() {
    // Get list of emails from API endpoint
    const emails = await EmailService.getEmail();

    // Set initial open email to nothing
    const openedEmail = ref(null);

    return {
      emailSelection: useEmailSelection(),
      format,
      emails: ref(emails),
      openedEmail
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
      this.openedEmail = email;

      if (email) {
        email.read = true;
        await EmailService.updateEmail(email);
      }
    },
    async archiveEmail(email) {
      email.archived = true;
      await EmailService.updateEmail(email);
    },
    async changeEmail({
      toggleRead,
      toggleArchive,
      save,
      changeIndex,
      closeModal
    }) {
      const email = this.openedEmail;

      if (email) {
        if (toggleRead) {
          email.read = !email.read;
        }

        if (toggleArchive) {
          email.archived = !email.archived;
        }

        if (save) {
          await EmailService.updateEmail(email);
        }
      }

      if (changeIndex) {
        if (this.openedEmail) {
          const emails = this.unarchivedEmails;
          const currentIndex = emails.indexOf(this.openedEmail); // Vetur shows this as an error, but it isn't in practice
          const newEmail = emails[currentIndex + changeIndex];
          this.openEmail(newEmail);
        }
      }

      if (closeModal) {
        this.openedEmail = null;
      }
    }
  }
});
</script>
