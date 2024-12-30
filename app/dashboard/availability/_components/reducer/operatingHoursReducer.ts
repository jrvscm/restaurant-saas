export const operatingHoursReducer = (state, action) => {
  switch (action.type) {
    case 'SET_AVAILABILITY':
      return { ...action.value };

    case 'TOGGLE_DAY':
      const newState = { ...state };
      if (newState[action.day]) {
        delete newState[action.day];
      } else {
        newState[action.day] = { startTime: '09:00', endTime: '17:00' }; // Default times
      }
      return newState;

    case 'UPDATE_END_TIME':
      const updatedEndState = { ...state };
      if (updatedEndState[action.day]) {
        updatedEndState[action.day].endTime = action.value;
      }
      return updatedEndState;

    case 'UPDATE_START_TIME':
      const updatedStartState = { ...state };
      console.log(state);
      if (updatedStartState[action.day]) {
        updatedStartState[action.day].startTime = action.value;
      }
      return updatedStartState;

    default:
      return state;
  }
};
