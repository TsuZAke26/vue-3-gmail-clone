import { onBeforeUnmount } from 'vue';

import KeyCombo from '@/interfaces/IKeyCombo';

const useKeydown = (keyCombos: KeyCombo[]) => {
  // Function containing the logic to perform on keypress
  const onKeydown = (event: KeyboardEvent) => {
    // Locate a KeyCombo in the array that matches the pressed key
    const keyCombo = keyCombos.find((kc: KeyCombo) => kc.key === event.key);

    // If there is a KeyCombo for the pressed key,
    // call its corresponding function
    if (keyCombo) {
      keyCombo.fn();
    }
  };

  // Setup 'keydown' event listener on the window
  // and associate it with the onKeydown() function
  window.addEventListener('keydown', onKeydown);

  // Remove the above event listener when a component using this
  // composition function would be unmounted from the DOM
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeydown);
  });
};

export default useKeydown;
