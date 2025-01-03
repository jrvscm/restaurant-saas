type OperatingHoursAction =
  | { type: 'SET_AVAILABILITY'; value: OperatingHoursState }
  | { type: 'TOGGLE_DAY'; day: string }
  | { type: 'UPDATE_START_TIME'; day: string; value: string }
  | { type: 'UPDATE_END_TIME'; day: string; value: string };

type OperatingHour = {
  startTime: string;
  endTime: string;
};

type OperatingHoursState = {
  [day: string]: OperatingHour;
};

export const operatingHoursReducer = (
  state: OperatingHoursState,
  action: OperatingHoursAction
): OperatingHoursState => {
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
      if (updatedStartState[action.day]) {
        updatedStartState[action.day].startTime = action.value;
      }
      return updatedStartState;

    default:
      return state;
  }
};
