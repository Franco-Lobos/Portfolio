import {createBrowserRouter} from "react-router-dom";

import Animation from "./components/intro/Animation";
import Home from "./components/home/Home";

const Router = createBrowserRouter([
  {
    path: "/animation",
    element: <Animation></Animation>,
  },
  {
    path: "/",
    element: <Home></Home>,
  },
  // {
  //   path: "about",
  //   element: <div>About</div>,
  // },
]);

export default Router
