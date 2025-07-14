import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme";
import { GlobalStyle } from "./styles/global";
import { SearchBar } from "./components/SearchBar";
import { WeatherCard } from "./components/weathercast/WeatherCard";

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <div style={{ padding: "2rem" }}>
        <button onClick={() => setIsDark(!isDark)}>
          Alternar Tema
        </button>
        <SearchBar />
        <WeatherCard />
      </div>
    </ThemeProvider>
  );
}

export default App;
