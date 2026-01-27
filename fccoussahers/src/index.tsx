import './index.css';
import React from "react";
import { render } from "react-dom";
import { App } from "./App";
import { HelmetProvider } from 'react-helmet-async';
render(<App />, document.getElementById("root"));