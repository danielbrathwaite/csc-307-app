import React from "react";
import ReactDOMClient from "react-dom/client";
import MyApp from "./MyApp";
import "./main.css";

const container = document.getElementById("root");

//create a root
const root = ReactDOMClient.createRoot(container);

//initial render
root.render(<MyApp />);