<template>
  <div class="email-display">
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
import { format } from 'date-fns';
import marked from 'marked';

export default {
  props: {
    email: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      format,
      marked
    };
  }
};
</script>

<style lang="scss" scoped></style>
