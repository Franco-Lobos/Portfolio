import {createBrowserRouter} from "react-router-dom";

import Home from "./components/Home";
const Router = createBrowserRouter([
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
