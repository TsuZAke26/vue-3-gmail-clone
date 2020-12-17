<template>
  <div class="email-display">
    <div>
      <button @click="toggleArchive">
        {{ email.archived ? 'Move to Inbox' : 'Archive' }} (a)
      </button>
      <button @click="toggleRead">
        {{ email.read ? 'Mark Unread' : 'Mark Read' }} (r)
      </button>
      <button>Next</button>
      <button>Previous</button>
    </div>

    <!-- Email subject -->
    <h2 class="mb-0">
      Subject: <strong>{{ email.subject }}</strong>
    </h2>

    <!-- Email sender & date received -->
    <div>
      <em>
        From {{ email.from }} on
        {{ format(new Date(email.sentAt), 'MMM dd, yyyy') }}
      </em>
    </div>

    <!-- Email body -->
    <div v-html="marked(email.body)" />
  </div>
</template>

<script>
import { reactive } from 'vue';
import { format } from 'date-fns';
import marked from 'marked';

import useKeydown from '@/composables/use-keydown';
import EmailService from '@/services/EmailService';

export default {
  props: {
    email: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const email = reactive(props.email);

    const toggleArchive = () => {
      email.archived = !email.archived;
      EmailService.updateEmail(email);
    };

    const toggleRead = () => {
      email.read = !email.read;
      EmailService.updateEmail(email);
    };

    // Setup key actions for email view
    useKeydown([
      {
        key: 'a',
        fn: toggleArchive
      },
      {
        key: 'r',
        fn: toggleRead
      }
    ]);

    return {
      format,
      marked,
      toggleArchive,
      toggleRead
    };
  }
};
</script>
