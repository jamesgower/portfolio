import React, { useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { ProfileState } from "../../interfaces/app.i";
import { AppState } from "../../../../store/store";
import * as actions from "../../actions/auth.actions";

const NavBar = ({ history }): JSX.Element => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { image } = useSelector(
    (state: AppState): ProfileState => state.letsWatch.auth.profile,
  );
  return (
    <div className="navbar__container">
      <div className="navbar__links-container">
        <NavLink
          activeClassName="navbar__active"
          exact
          to="/lets-watch"
          className="navbar__link"
        >
          Discover
        </NavLink>
        <NavLink
          activeClassName="navbar__active"
          to="/lets-watch/tv-shows"
          className="navbar__link"
        >
          TV Shows
        </NavLink>
        <NavLink
          activeClassName="navbar__active"
          to="/lets-watch/movies"
          className="navbar__link"
        >
          Movies
        </NavLink>
      </div>
      <Dropdown isOpen={open} toggle={(): void => setOpen(!open)}>
        <DropdownToggle tag="div" data-toggle="dropdown" aria-expanded={open}>
          <div className="navbar__link">
            <p className="navbar__profile">Profile</p>
            <img
              src={
                image ||
                "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              }
              alt="Profile"
              className="navbar__img"
            />
          </div>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header>Profile</DropdownItem>
          <DropdownItem>
            <NavLink to="/lets-watch/my-tv-shows">My TV Shows</NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink to="/lets-watch/my-movies">My Movies</NavLink>
          </DropdownItem>
          <DropdownItem header style={{ marginTop: "8px" }}>
            Settings
          </DropdownItem>
          <DropdownItem
            onClick={(): ((dispatch) => void) => dispatch(actions.logout(history))}
          >
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default withRouter(NavBar);
