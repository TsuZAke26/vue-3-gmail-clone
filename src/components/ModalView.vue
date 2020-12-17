<template>
  <div class="modal">
    <div class="overlay" @click="emit('closeModal')" />
    <div class="modal-card">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import useKeydown from '@/composables/use-keydown';

export default {
  setup(props, { emit }) {
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
};
</script>
