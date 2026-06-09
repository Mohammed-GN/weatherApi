import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CardWeather } from "./Card/Card";
const theme = createTheme({
  typography: {
    fontFamily: ["arabic"],
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          backgroundColor: "rgb(51, 167, 255)",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <CardWeather></CardWeather>
        {/* <div style={{ display: "flex", width: "65%", margin: "5px 0 0 20px" }}>
          <Button variant="none" style={{ color: "white", opacity: "0.8" }} onClick={{}}>
            الانجليزية
          </Button>
        </div> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
