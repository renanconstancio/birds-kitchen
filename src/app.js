import React, { useEffect } from "react";
import { Provider } from "react-redux";

import TopMenu from "./components/topmenu";
import Sidebar from "./components/sidebar";
import store from "./redux/store";
import RecipeArea from "./components/recipe-area";
import { StorageHelpers } from "./core/helpers";

import "./components/common.scss";

const App = () => {
  // constructor(props) {
  //   super(props);
  //   this.setTheme();
  //   this.setGridDisplay();
  //   StorageHelpers.initDb();
  //   StorageHelpers.autoBackup();
  //   setInterval(StorageHelpers.autoBackup, 1000 * 60 * 60 * 6);
  // }

  const setTheme = () => {
    const theme = `${
      StorageHelpers.preference.get("appTheme") || "athens"
    }-theme`;
    if (!document.body.classList.contains(theme)) {
      document.body.classList.add(theme);
    }
  };

  const setGridDisplay = () => {
    const recipesdisplay = `${
      StorageHelpers.preference.get("recipesdisplay") || "grid"
    }-display`;
    if (!document.body.classList.contains(recipesdisplay)) {
      document.body.classList.add(recipesdisplay);
    }
  };

  useEffect(() => {
    StorageHelpers.initDb();
    StorageHelpers.autoBackup();
    setTheme();
    setGridDisplay();
    setInterval(StorageHelpers.autoBackup, 1000 * 60 * 60 * 6);
  }, []);

  return (
    <Provider store={store}>
      <div className="top-menu-container">
        <TopMenu />
      </div>
      <div className="content-main-container">
        <div id="sidebar-container" className="sidebar-container">
          <Sidebar />
        </div>
        <div className="content-container">
          <RecipeArea />
        </div>
      </div>
    </Provider>
  );
};
export default App;
