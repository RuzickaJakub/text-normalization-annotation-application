import "./App.css";
import Normalizer from "./components/Normalizer";
import { FormProvider, useForm } from "react-hook-form";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Sentence } from "./types/Sentence";
import {
  AppBar,
  Box,
  Button,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import LoginDialog from "./components/LoginDialog";
import React from "react";
import ListDatasets from "./components/ListDatasets";
import Manual from "./components/Manual";
import { CookiesProvider } from "react-cookie";
import { SentenceState } from "./types/SentenceState";

export const ApiContext = React.createContext({} as { baseUrl: string });

function App() {
  /**
   * Application for data normalization with intended usecase in text to speech
   * systems.
   */
  const methods = useForm<Sentence>({
    defaultValues: {
      dataset_name: "",
      sentence_id: "",
      sentence_state: Object.keys(
        SentenceState
      )[0] as keyof typeof SentenceState,
      original_sentence: "",
      normalized_sentence: "",
      tokens: [],
    },
  });
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  // const lightTheme = createTheme({
  //   palette: {
  //     mode: "light",
  //   },
  // });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <CookiesProvider>
        <FormProvider {...methods}>
          <Router>
            <AppBar>
              <Toolbar variant="dense">
                <Link to="/">
                  <Button variant="text">Anotace</Button>
                </Link>
                <Link to="/datasets">
                  <Button variant="text">Datasety</Button>
                </Link>
                <Link to="/manual">
                  <Button variant="text">Manual</Button>
                </Link>
                <Box sx={{ flexGrow: 1 }} />{" "}
                {/** All elements after this are aligned to the right */}
                <LoginDialog />
              </Toolbar>
            </AppBar>
            <Toolbar variant="dense" />
            <ApiContext.Provider
              value={{ baseUrl: process.env.REACT_APP_BACKEND_URL as string }}
            >
              <Routes>
                <Route path="/" element={<Normalizer />}></Route>
                <Route path="/datasets" element={<ListDatasets />}></Route>
                <Route path="/manual" element={<Manual />}></Route>
              </Routes>
            </ApiContext.Provider>
          </Router>
        </FormProvider>
      </CookiesProvider>
    </ThemeProvider>
  );
}

export default App;
