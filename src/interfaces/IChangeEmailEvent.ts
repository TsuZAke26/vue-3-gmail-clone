interface ChangeEmailEvent {
  toggleRead?: boolean;
  toggleArchive?: boolean;
  save?: boolean;
  changeIndex?: 1 | -1;
  closeModal?: boolean;
}

export default ChangeEmailEvent;
