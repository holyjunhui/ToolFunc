
import reducer from './reducer';

const createStore = reducer => {
  // console.log('%c createStore is Being executed', 'color: red')
  let state;
  let listenersByAction = {};

  const getState = () => state;
  const dispatch = (action) => {
    const { type } = action;
    if (!type) {
      throw new Error('Action must have a type property');
    }
    state = reducer(state, action);

    const listeners = listenersByAction[type];
    listeners && listeners.forEach(listener => listener());
  };

  const subscribe = (listener, actionType) => {
    if (!actionType) {
      throw new Error('You have to specify what action type to listen for');
    }

    let types = [];
    const isString = typeof actionType === 'string';
    const isArray = Array.isArray(actionType);

    if (isString) {
      types.push(actionType);
    } else if (isArray) {
      types = actionType;
    } else {
      throw new Error('The second parameter of "subscribe" can only be a String or an Array of strings');
    }

    types.forEach(type => {
      const listeners = listenersByAction[type] || [];
      if (listeners.findIndex(
        l => l === listener) === -1) {
        // Store the listener callback if it's not present.
        listeners.push(listener);
      }

      listenersByAction[type] = listeners;
    });

    return () => {
      types.forEach(type => {
        const listeners = listenersByAction[type] || [];

        listenersByAction[type] = listeners.filter(l => l !== listener);
      });
    };
  };

  dispatch({ type: Symbol() });

  return { getState, dispatch, subscribe };
};

export default createStore(reducer);
