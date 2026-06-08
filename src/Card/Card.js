import CloudIcon from "@mui/icons-material/Cloud";
import CircularProgress from "@mui/material/CircularProgress";

// import axios from "axios";
import moment from "moment";
import "moment/locale/ar";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";

import { useSelector, useDispatch } from "react-redux";
import { changeResult } from "../features/weatherApi/weatherApiSlice";
import { fetchWeather } from "../features/weatherApi/weatherApiSlice";

import { useEffect, useState } from "react";
// import { changeLanguage } from "i18next";

// let cancelAxios = null;
export function CardWeather() {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => {
    return state.weather.isLoading;
  });

  const temp = useSelector((state) => {
    return state.weather.weather;
  });
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("ar");
  const [time, setTime] = useState(null);
  const [Ldirection, setLDirection] = useState("rtl");

  // const [temp, setTemp] = useState({
  //   temperatur: null,
  //   cityName: "",
  //   min: null,
  //   max: null,
  //   descreption: "",
  //   icon: null,
  // });

  function handleLanguage() {
    if (language === "ar") {
      i18n.changeLanguage("en");
      setLanguage("en");
      moment.locale("en");
      setLDirection("ltr");
    } else {
      i18n.changeLanguage("ar");
      setLanguage("ar");
      moment.locale("ar");
      setLDirection("rtl");
    }
    setTime(moment().format("MMM Do YY"));
  }
  useEffect(() => {
    dispatch(fetchWeather());
    dispatch(changeResult());
    i18n.changeLanguage("ar");
    setTime(moment().format("MMM Do YY"));

    // axios
    //   .get(
    //     "https://api.openweathermap.org/data/2.5/weather?lat=31.616&lon=-2.216&units=metric&appid=0367f1ee165f5632042af8abb4428119",
    //     {
    //       params: {
    //         postId: 5,
    //       },
    //       cancelToken: new axios.CancelToken((c) => {
    //         cancelAxios = c;
    //       }),
    //     }
    //   )
    //   .then((response) => {
    //     const responseTemp = Math.round(response.data.main.temp);
    //     const responseMin = Math.round(response.data.main.temp_min);
    //     const responseMax = Math.round(response.data.main.temp_max);
    //     const responseDescription = response.data.weather[0].description;
    //     const responseIcone = response.data.weather[0].icon;

    //     setTemp({
    //       temperatur: responseTemp,
    //       cityName: "",
    //       min: responseMin,
    //       max: responseMax,
    //       descreption: responseDescription,
    //       icon: `https://openweathermap.org/img/wn/${responseIcone}@2x.png`,
    //     });
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    // return () => {
    //   console.log("cancelling");
    //   cancelAxios();
    // };
  }, []);

  return (
    <div
      style={{
        direction: `${Ldirection}`,
        color: "white",
        width: "420px",
        height: "280px",
        backgroundColor: "rgb(0, 108, 191)",
        borderRadius: "15px",
        boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
      }}
    >
      <header
        style={{
          display: "flex",
          gap: "20px",
          margin: "0 40px ",
          height: "25%",
        }}
      >
        <h1>{t("Bechar")}</h1>
        <p style={{ marginTop: "35px" }}>{time}</p>
      </header>
      <hr></hr>

      <div
        style={{
          width: "100%",
          height: "70%",
          display: "flex",
          justifyContent: "space-between",
          padding: "0 10px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "60%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "8px",
            alignItems: "flex-start",
          }}
        >
          <div style={{ display: "flex" }}>
            {isLoading ? <CircularProgress style={{ color: "white" }} /> : ""}

            <h2
              style={{
                fontSize: "55px",
                fontWeight: "normal",
                letterSpacing: "2px",
                marginTop: "-10px",
              }}
            >
              {temp.temperatur}
            </h2>

            <img src={temp.icon} alt="weatherIcon"></img>
          </div>
          <p style={{ margin: 0, opacity: 0.8 }}>{temp.descreption}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "60%",
            }}
          >
            <h5>
              {t("الصغرى")}:{temp.min}
            </h5>
            <h5> | </h5>
            <h5>
              {t("الكبرى")}:{temp.max}
            </h5>
          </div>
        </div>
        <div
          style={{
            width: "40%",
            margin: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CloudIcon style={{ fontSize: "120px" }}></CloudIcon>
        </div>
      </div>
      <Button
        variant="none"
        style={{ color: "white", opacity: "0.8" }}
        onClick={handleLanguage}
      >
        {t("الانجليزية")}
      </Button>
    </div>
  );
}
