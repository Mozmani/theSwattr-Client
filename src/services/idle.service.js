const _FIVE_MINUTES = 5 * 60 * 1e3;
const _nonIdleEvents = [
  'mousedown',
  'mousemove',
  'keypress',
  'scroll',
  'touchstart',
];
let _timeout;
let _idleCallback;

const IdleService = {
  setIdleCallback(idleCallback) {
    _idleCallback = idleCallback;
  },

  resetIdleTimer() {
    clearTimeout(_timeout);
    _timeout = setTimeout(_idleCallback, _FIVE_MINUTES);
  },

  regiserIdleTimerResets() {
    _nonIdleEvents.forEach((event) =>
      document.addEventListener(event, this.resetIdleTimer, true),
    );
  },

  unRegisterIdleResets() {
    clearTimeout(_timeout);
    _nonIdleEvents.forEach((event) =>
      document.removeEventListener(event, this.resetIdleTimer, true),
    );
  },
};

export default IdleService;
