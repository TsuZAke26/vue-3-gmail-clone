import { reactive } from 'vue';
import Email from '@/interfaces/IEmail';

const emails = reactive(new Set());

export const useEmailSelection = function() {
  const toggle = function(email: Email) {
    if (emails.has(email)) {
      emails.delete(email);
    } else {
      emails.add(email);
    }
  };

  return {
    emails,
    toggle
  };
};

export default useEmailSelection;
