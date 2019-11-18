import React, { useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ProfileState } from "../../interfaces/app.i";
import { AppState } from "../../../../store/store";
import * as actions from "../../actions/auth.actions";

const NavBar = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { image } = useSelector(
    (state: AppState): ProfileState => state.letsWatch.auth.profile,
  );
  return (
    <div className="navbar__container">
      <div className="navbar__links-container">
        <p className="navbar__link">Discover</p>
        <p className="navbar__link">TV Shows</p>
        <p className="navbar__link">Movies</p>
      </div>
      <Dropdown isOpen={open} toggle={(): void => setOpen(!open)}>
        <DropdownToggle tag="div" data-toggle="dropdown" aria-expanded={open}>
          <img
            src={
              image ||
              "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            }
            alt="Profile"
            className="navbar__img"
          />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header>Profile</DropdownItem>
          <DropdownItem>My TV Shows</DropdownItem>
          <DropdownItem>My Movies</DropdownItem>
          <DropdownItem>My Ratings</DropdownItem>
          <DropdownItem header style={{ marginTop: "8px" }}>
            Settings
          </DropdownItem>
          <DropdownItem>
            <Link to="/account">Account</Link>
          </DropdownItem>
          <DropdownItem onClick={() => dispatch(actions.logout())}>Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default NavBar;
