import {createBrowserRouter} from "react-router-dom";

import Intro from "./components/Intro";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Intro></Intro>,
  },
  // {
  //   path: "about",
  //   element: <div>About</div>,
  // },
]);

export default Router
