import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let cancelAxios = null;
export const fetchWeather = createAsyncThunk(
  "wetherApi/fetchWeather",
  async () => {
    console.log("calling weather");
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=31.616&lon=-2.216&units=metric&appid=0367f1ee165f5632042af8abb4428119",
      {
        params: {
          postId: 5,
        },
        cancelToken: new axios.CancelToken((c) => {
          cancelAxios = c;
        }),
      }
    );
    const responseTemp = Math.round(response.data.main.temp);
    const responseMin = Math.round(response.data.main.temp_min);
    const responseMax = Math.round(response.data.main.temp_max);
    const responseDescription = response.data.weather[0].description;
    const responseIcone = response.data.weather[0].icon;

    console.log(response);
    return {
      temperatur: responseTemp,
      min: responseMin,
      max: responseMax,
      description: responseDescription,
      icon: `https://openweathermap.org/img/wn/${responseIcone}@2x.png`,
    };

    // setTemp({
    //   temperatur: responseTemp,
    //   cityName: "",
    //   min: responseMin,
    //   max: responseMax,
    //   descreption: responseDescription,
    //   icon: `https://openweathermap.org/img/wn/${responseIcone}@2x.png`,
    // });
  }
);
const initialState = {
  result: "empty",
  weather: {},
  isLoading: false,
};
export const weatherApiSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    changeResult: (state, action) => {
      state.result = "changed";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWeather.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.weather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});
export const { changeResult } = weatherApiSlice.actions;

export default weatherApiSlice.reducer;
