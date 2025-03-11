export const logoutEvent = () => {
  window.dispatchEvent(new Event("logout"));
}
