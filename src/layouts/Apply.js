import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/SidebarApply.js";

import routes from "routes.js";

class Admin extends React.Component {
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/apply") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getApplyRoutes = routes => {
      let found = [];
      routes.forEach(element => {
          if (element.layout === "/apply") {
            found.push(element);
          }
      });
      return found;
  }
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Application Centre";
  };
  render() {
    return (
      <>
        <Sidebar
          {...this.props}
          routes={this.getApplyRoutes(routes)}
          logo={{
            innerLink: "/apply/home",
            imgSrc: require("assets/img/brand/argon-react.png"),
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
          <Switch>
            {this.getRoutes(routes)}
            <Redirect from="*" to="/apply/home" />
          </Switch>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    );
  }
}

export default Admin;
