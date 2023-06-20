import {createBrowserRouter} from "react-router-dom";
import { useState } from "react";

// import Animation from "./components/intro/Animation";
import Intro from "./components/intro/Intro";
import Template from "./components/Template/Template";

const Router = createBrowserRouter([  

  {
    path: "/*",
    element: <Template></Template>,
  },
  {
    path: "/intro",
    element: <Intro></Intro>,
  }

]);

export default Router
