import React from "react";
import i18next from "i18next";
import { withRouter } from "react-router";
import { Switch, Route } from "react-router-dom";
import { getAuth } from "./services/api";

import FatalError from "./theme/layouts/FatalError";
import LoginApp from "./apps/Login";
import AdminApp from "./apps/admin";
import DeviceApp from "./apps/device";
import { createDevice, isOnline } from "services/api";

class Login extends React.PureComponent {
  render = () => <LoginApp/>;
}

class Admin extends React.PureComponent {
  async componentDidMount() {
    const { scope, adminUrl } = await getAuth();

    if (scope !== "admin") {
      window.location = adminUrl;
    }
  }

  render = () => <AdminApp/>;
}

class Device extends React.PureComponent {
  async componentDidMount() {
    const { scope } = await getAuth();

    if (scope !== "device") {
      createDevice();
    }
  }

  render = () => <DeviceApp/>;
}

class Router extends React.PureComponent {
  state = { isConfirmedOnline: false, hasFirstOnlineCheckBeenDone: false };

  async componentDidMount() {
    while (!await isOnline()) {
      this.setState({ hasFirstOnlineCheckBeenDone: true });
      await new Promise(res => setTimeout(res, 5000));
    }

    this.setState({ hasFirstOnlineCheckBeenDone: true, isConfirmedOnline: true });
  }

  render() {
    if (!this.state.hasFirstOnlineCheckBeenDone) {
      return null;
    }

    if (!this.state.isConfirmedOnline) {
      return <FatalError title={i18next.t("errors.unable-to-connect-server")}
                         message={i18next.t("errors.check-internet-and-try-again")}/>;
    }

    return (
      <Switch>
        <Route exact path={"/device"} render={() => <Device/>}/>
        <Route exact path={"/admin"} render={() => <Admin/>}/>
        <Route render={() => <Login/>}/>
      </Switch>
    );
  }
}

export default withRouter(Router);
