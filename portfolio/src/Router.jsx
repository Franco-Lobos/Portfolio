import {createBrowserRouter} from "react-router-dom";

import Animation from "./components/intro/Animation";
import Template from "./components/Template/Template";

const Router = createBrowserRouter([
  {
    path: "/*",
    element: <Template></Template>,
  },
  {
    path: "/animation",
    element: <Animation></Animation>,
  }

]);

export default Router
