import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "bootstrap/dist/css/bootstrap.min.css";

import ScrollToTop from "components/Partials/ScrollToTop/ScrollToTop";
import ContextProvider from "contexts";
import { BrowserRouter as Router } from "react-router-dom";
import MainRouter from "routers/Router";
import "./App.scss";
export default function App() {
  return (
    <>
      <ContextProvider>
        <Router>
          <ScrollToTop />
          {/* <LoadingLayer show={loading} /> */}
          <MainRouter />
        </Router>
      </ContextProvider>
    </>
  );
}
