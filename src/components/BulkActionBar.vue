<template>
  <div>
    <input
      type="checkbox"
      :checked="allEmailsSelected"
      :class="[someEmailsSelected ? 'partial-check' : '']"
      @click="bulkSelect"
    />
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
    const totalEmails = emails.value.length;

    const allEmailsSelected = computed(
      () => numberSelected.value === totalEmails
    );

    const someEmailsSelected = computed(() => {
      return numberSelected.value > 0 && numberSelected.value < totalEmails;
    });

    const bulkSelect = function() {
      if (allEmailsSelected.value) {
        emailSelection.clear();
      } else {
        emailSelection.addMultiple(emails.value);
      }
    };

    return {
      allEmailsSelected,
      someEmailsSelected,
      bulkSelect
    };
  }
});
</script>
