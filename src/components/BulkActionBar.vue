<template>
  <div class="bulk-action-bar">
    <span class="checkbox">
      <input
        type="checkbox"
        :checked="allEmailsSelected"
        :class="[someEmailsSelected ? 'partial-check' : '']"
        @click="bulkSelect"
      />
    </span>

    <span class="buttons">
      <button
        @click="emailSelection.markRead"
        :disabled="[...emailSelection.emails].every(email => email.read)"
      >
        Mark Read
      </button>

      <button
        @click="emailSelection.markUnread"
        :disabled="[...emailSelection.emails].every(email => !email.read)"
      >
        Mark Unread
      </button>

      <button :disabled="numberSelected === 0" @click="emailSelection.archive">
        Archive
      </button>
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue';

import Email from '@/interfaces/IEmail';

import useEmailSelection from '@/composables/useEmailSelection';

export default defineComponent({
  props: {
    emails: {
      type: Array as PropType<Email[]>,
      required: true
    }
  },
  setup(props) {
    const emailSelection = useEmailSelection();

    const numberSelected = computed(() => emailSelection.emails.size);

    // Get props in reactive form & destructure to get the prop desired
    const { emails } = toRefs(props);
    const totalEmails = computed(() => emails.value.length);

    const allEmailsSelected = computed(
      () => numberSelected.value === totalEmails.value
    );

    const someEmailsSelected = computed(() => {
      return (
        numberSelected.value > 0 && numberSelected.value < totalEmails.value
      );
    });

    const bulkSelect = function() {
      if (allEmailsSelected.value) {
        emailSelection.clear();
      } else {
        emailSelection.addMultiple(emails.value);
      }
    };

    return {
      emailSelection,
      allEmailsSelected,
      someEmailsSelected,
      numberSelected,
      bulkSelect
    };
  }
});
</script>
