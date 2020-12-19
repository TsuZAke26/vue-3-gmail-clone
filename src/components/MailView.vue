<template>
  <div class="email-display">
    <div>
      <button @click="toggleArchive">
        {{ email.archived ? 'Move to Inbox' : 'Archive' }} (e)
      </button>
      <button @click="toggleRead">
        {{ email.read ? 'Mark Unread' : 'Mark Read' }} (r)
      </button>
      <button @click="goToNewerEmail">Newer (k)</button>
      <button @click="goToOlderEmail">Older (j)</button>
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

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { format } from 'date-fns';
import marked from 'marked';

import ChangeEmailEvent from '@/interfaces/IChangeEmailEvent';
import Email from '@/interfaces/IEmail';

import useKeydown from '@/composables/useKeydown';

export default defineComponent({
  props: {
    email: {
      type: Object as PropType<Email>,
      required: true
    }
  },
  setup(props, { emit }) {
    const toggleRead = () => {
      const eventPayload: ChangeEmailEvent = { toggleRead: true, save: true };
      emit('changeEmail', eventPayload);
    };

    const toggleArchive = () => {
      const eventPayload: ChangeEmailEvent = {
        toggleArchive: true,
        save: true,
        closeModal: true
      };
      emit('changeEmail', eventPayload);
    };

    const goToNewerEmail = () => {
      const eventPayload: ChangeEmailEvent = { changeIndex: -1 };
      emit('changeEmail', eventPayload);
    };

    const goToNewerEmailAndArchive = () => {
      const eventPayload: ChangeEmailEvent = {
        changeIndex: -1,
        toggleArchive: true,
        save: true
      };
      emit('changeEmail', eventPayload);
    };

    const goToOlderEmail = () => {
      const eventPayload: ChangeEmailEvent = { changeIndex: 1 };
      emit('changeEmail', eventPayload);
    };

    const goToOlderEmailAndArchive = () => {
      const eventPayload: ChangeEmailEvent = {
        changeIndex: 1,
        toggleArchive: true,
        save: true
      };
      emit('changeEmail', eventPayload);
    };

    // Setup key actions for email view
    useKeydown([
      // Toggle read/unread
      {
        key: 'r',
        fn: toggleRead
      },

      // Archive
      {
        key: 'e',
        fn: toggleArchive
      },

      // Go to newer email
      {
        key: 'k',
        fn: goToNewerEmail
      },

      // Go to older email
      {
        key: 'j',
        fn: goToOlderEmail
      },

      // Archive current email and go to newer email
      {
        key: '[',
        fn: goToNewerEmailAndArchive
      },

      // Archive current email and go to older email
      {
        key: ']',
        fn: goToOlderEmailAndArchive
      }
    ]);

    return {
      format,
      marked,
      toggleArchive,
      toggleRead,
      goToNewerEmail,
      goToOlderEmail
    };
  }
});
</script>
