<template>
  <div class="modal">
    <div class="overlay" @click="emit('closeModal')" />
    <div class="modal-card">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useKeydown from '@/composables/use-keydown';

export default defineComponent({
  setup(_, { emit }) {
    // Setup key actions for when the modal is open
    useKeydown([
      {
        key: 'Escape',
        fn: () => {
          emit('closeModal');
        }
      }
    ]);

    return {
      emit
    };
  }
});
</script>
