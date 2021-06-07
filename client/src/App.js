import React from "react";
import './App.css';
import {Route, Switch} from "react-router-dom";
import Client from "./features/Client/index";
import Admin from "./features/Admin/index";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  return (
      <div className="App">
          <Switch>
              <Route path={'/admin'} component={Admin}/>
              <Route path={'/'} component={Client}/>
          </Switch>
          <ToastContainer />
      </div>

  );
}

export default App;
