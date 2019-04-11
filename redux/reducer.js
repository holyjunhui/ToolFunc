import events from './eventTypes';

const initialState = {
  fetching: null,
  isPageLoading: false,
  denotingKey: 'default'
};
export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case events.FETCHING:
      return { fetching: true };
    case events.FETCHED:
      return { fetching: false };
    case events.SETLOADING:
      return {
        ...state,
        isPageLoading: action.isLoading
      };
    case events.HIDEBUBBLETIP:
      return state;
    case events.SETBUBBLETYPE:
      return {
        ...state,
        denotingKey: action.bubbleType
      };
    default:
      return initialState
  }
};