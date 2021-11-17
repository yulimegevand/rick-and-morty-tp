import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import episodeDataReducer from '../features/episodeData/episodeData.slice';
import globalReducer from '../features/global/global.slice';

export const store = configureStore({
  reducer: {
    global: globalReducer,
    counter: counterReducer,
    episodeData: episodeDataReducer,
  },
});
