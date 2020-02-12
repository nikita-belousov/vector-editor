import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "./ui/store";
import { App } from "./ui/components/app";
import { Artboard } from "./artboard/artboard";

import "normalize.css";
import "./ui/styles/index.css";

const store = configureStore();
const artboard = new Artboard();
artboard.patchStore(store);

const rootElement = document.getElementById("root");

render(
  <Provider store={store}>
    <App artboard={artboard} />
  </Provider>,
  rootElement
);
