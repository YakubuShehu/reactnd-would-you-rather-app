// Responsible for logging states to browser console

const logger = store => next => action => {
  console.group(action.type);
  console.log('The current action:', action);
  const result = next(action);
  console.log('The new state: ', store.getState());
  console.groupEnd();
  return result;
};

export default logger;