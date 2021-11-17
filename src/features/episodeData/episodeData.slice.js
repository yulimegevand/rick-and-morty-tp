import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  episodeData: {
    id: null,
    name: null,
   episode: null,
  }
};


export const loadEpisodeData = createAsyncThunk(
  'episodeData/load',
  async (id) => {
    const response = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);
    if(response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  }
);

export const saveEpisode = createAsyncThunk(
  'episodeData/saveEpisode',
  async (episode) => {
    const response = await axios.post(`https://rickandmortyapi.com/api/episode`, {
      body: JSON.stringify(episode),
    });
    if(response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  }
);

export const episodeData = createSlice({
  name: 'episodeData',
  initialState,
  reducers: {
    addEpisodeData: (state, action) => {
      state.episodeData = action.payload;
    },
    cleanEpisodeData: (state) => {
      console.log("clean episode data")
      state.episodeData = {
        ...initialState.episodeData
      };
    },
  },
  
});

export const { addEpisodeData, cleanEpisodeData } = episodeData.actions;

export default episodeData.reducer;
