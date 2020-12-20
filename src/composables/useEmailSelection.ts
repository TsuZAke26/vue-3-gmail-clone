import { reactive } from 'vue';

import Email from '@/interfaces/IEmail';

import EmailService from '@/services/EmailService';

// Can be used throughout the whole app
// due to being reactive but outside the below function
const emails: Set<Email> = reactive(new Set());

export const useEmailSelection = () => {
  // Add/remove single email to selected emails set
  const toggle = (email: Email) => {
    if (emails.has(email)) {
      emails.delete(email);
    } else {
      emails.add(email);
    }
  };

  // Deselect all emails
  const clear = () => {
    emails.clear();
  };

  // Add multiple emails to selected emails set
  const addMultiple = (newEmails: Email[]) => {
    newEmails.forEach((email: Email) => {
      emails.add(email);
    });
  };

  // General function to apply for selected emails
  // The function parameter (fn) defines the
  // unique action to apply to a selected email
  const forSelected = (fn: (e: Email) => void) => {
    emails.forEach((email: Email) => {
      fn(email);
      EmailService.updateEmail(email);
    });
  };

  const markRead = () => forSelected(email => (email.read = true));

  const markUnread = () => forSelected(email => (email.read = false));

  const archive = () => {
    forSelected(email => (email.archived = true));
    clear();
  };

  return {
    emails,
    toggle,
    clear,
    addMultiple,
    markRead,
    markUnread,
    archive
  };
};

export default useEmailSelection;
