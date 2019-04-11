const eventBus = {};
const getEventBus = event => {
  if (eventBus[event]) {
    return eventBus[event];
  }

  return eventBus[event] = (function () {
    let callback = [];
    const typeBindings = {};

    return {
      registerListener(cb, type) {
        if (typeBindings[type]) return;
        callback.push(cb);
        if (type) {
          typeBindings[type] = true;
        }
        return () => {
          callback = callback.filter(c => c !== cb);
          typeBindings[type] = null;
        };
      },
      triggerEvent(...params) {
        if (callback.length) {
          callback.forEach(cb => {
            cb.apply(this, params);
          });
        }
      }
    };
  }());
};