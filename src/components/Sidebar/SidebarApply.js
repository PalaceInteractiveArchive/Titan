/*eslint-disable*/
import React from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";
import Cookies from "universal-cookie";

const cookies = new Cookies();

var ps;

class Sidebar extends React.Component {
  state = {
    collapseOpen: false
  };
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
    this.searchRef = React.createRef();
    this.state = {
      searchInput: ''
    }
    this.searchUser = this.searchUser.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  // toggles collapse between opened and closed (true/false)
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false
    });
  };
  // creates the links that appear in the left menu / Sidebar
  createLinks = routes => {
    return routes.map((prop, key) => {
      if(prop.invisible) return null;
      if(prop.restricted) {
        let sGroupCheck = false;
        let secondaries = cookies.get("sGroups")
        secondaries.forEach(element => {
          if (prop.restricted.groups.includes(element)) {
            sGroupCheck = true;
          }
        });
        if (cookies.get("user").allowedRoutes.includes(prop.restricted.type) | prop.restricted.groups.includes(cookies.get("user").pgroup) | sGroupCheck) {
          return (
            <NavItem key={key}>
              <NavLink
                to={prop.layout + prop.path}
                tag={NavLinkRRD}
                onClick={this.closeCollapse}
                activeClassName="active"
              >
                <i className={prop.icon} />
                {prop.name}
              </NavLink>
            </NavItem>
          );
        } else {
          return null;
        }
      }
      if (prop.divide) {
        return (
          <NavItem>
            <hr className="my-3" style={{maxWidth: "202px"}}/>
            <center>
              <h6 className="navbar-heading text-muted">{prop.name}</h6>
            </center>
          </NavItem>)
      }
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      );
    });
  };

  handleSearchChange(event) {
    this.setState({searchInput: event.target.value});
  }

  searchUser = (e) => {
    e.preventDefault();
    let action = "/dash/user/" + this.state.searchInput;
    this.searchRef.current.action = action;
    window.location.replace(action)
  }

  render() {
    const { bgColor, routes, logo } = this.props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: "_blank"
      };
    }
    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="md"
        id="sidenav-main"
      >
        <Container fluid>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.toggleCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Brand */}
          {logo ? (
            <NavbarBrand className="pt-0" {...navbarBrandProps}>
              <img
                alt={logo.imgAlt}
                className="navbar-brand-img"
                src={require("assets/img/brand/palace-text.png").default}
              />
            </NavbarBrand>
          ) : null}
          {/* Collapse */}
          <Collapse navbar isOpen={this.state.collapseOpen}>
            {/* Collapse header */}
            <div className="navbar-collapse-header d-md-none">
              <Row>
                {logo ? (
                  <Col className="collapse-brand" xs="6">
                    {logo.innerLink ? (
                      <Link to={logo.innerLink}>
                        <img alt={logo.imgAlt} src={require("assets/img/brand/palace-text.png").default} />
                      </Link>
                    ) : (
                      <a href={logo.outterLink}>
                        <img alt={logo.imgAlt} src={require("assets/img/brand/palace-text.png").default} />
                      </a>
                    )}
                  </Col>
                ) : null}
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={this.toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            {/* Form */}
            {/* Navigation */}
            <Nav navbar>{this.createLinks(routes)}</Nav>
            {/* Divider */}
            <hr className="my-3" />
            {/* Heading */}
            <center>
            <h6 className="navbar-heading text-muted">Titan</h6>
            </center>
        </Collapse>
        </Container>
      </Navbar>
    );
  }
}

Sidebar.defaultProps = {
  routes: [{}]
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    //imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  })
};

export default Sidebar;
