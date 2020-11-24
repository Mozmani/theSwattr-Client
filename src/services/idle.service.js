import TokenService from './token.service';

const _FIVE_MINUTES = 5 * 60 * 1e3,
  _TEN_SECONDS = 10e3,
  _nonIdleEvents = [
    'mousedown',
    'mousemove',
    'keypress',
    'scroll',
    'touchstart',
  ];
let _idleTimeout, _tokenTimeout, _idleCallback;

const IdleService = {
  setIdleCallback(idleCallback) {
    _idleCallback = idleCallback;
  },

  _resetIdleTimer() {
    clearTimeout(_idleTimeout);
    _idleTimeout = setTimeout(_idleCallback, _FIVE_MINUTES);
  },

  addIdleResets() {
    _nonIdleEvents.forEach((event) =>
      document.addEventListener(event, this._resetIdleTimer, true),
    );
  },

  removeIdleResets() {
    clearTimeout(_idleTimeout);
    _nonIdleEvents.forEach((event) =>
      document.removeEventListener(event, this._resetIdleTimer, true),
    );
  },

  _getMsUntilExpiry(payload) {
    if (!payload) return null;
    return payload.exp * 1000 - Date.now();
  },

  loadCallbackBeforeExpiry(callback) {
    const msUntilExpiry = this._getMsUntilExpiry(
      TokenService.parseAuthToken(),
    );

    if (msUntilExpiry) {
      _tokenTimeout = setTimeout(
        callback,
        msUntilExpiry - _TEN_SECONDS,
      );
    }
  },

  clearCallbackBeforeExpiry() {
    clearTimeout(_tokenTimeout);
  },
};

export default IdleService;
