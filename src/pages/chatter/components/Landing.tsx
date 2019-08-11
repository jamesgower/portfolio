import React from "react";
import {
  InputGroup,
  InputGroupButtonDropdown,
  Input,
  Label,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Tooltip,
} from "reactstrap";
import Chat from "./Chat";
import { isRealString } from "../utils/validation";
import "../scss/chatter.scss";

class Landing extends React.Component {
  public readonly state = {
    name: "",
    room: "",
    nameError: false,
    roomError: false,
    dropdownOpen: false,
    submitted: false,
  };

  /*
        Open dropdown for room change on firing
    */
  private toggleDropDown = (): void => {
    const { dropdownOpen } = this.state;
    this.setState({
      dropdownOpen: !dropdownOpen,
    });
  };

  private onSubmit = (e): void => {
    const { name, room } = this.state;
    e.preventDefault();
    /*
            Check if name & room are valid strings. If they are, then set relevant state 
            to match the strings, and set submitted state to true.
        */
    if (isRealString(name) && isRealString(room)) {
      this.setState({ submitted: true });
    } else {
      /*
                If either of the strings are not valid, then set the relevant error state
                to true, and show the relevant error.
            */
      if (!isRealString(name)) {
        this.setState({ nameError: true });
        setTimeout((): void => {
          this.setState({ nameError: false });
        }, 2500);
      }
      if (!isRealString(room)) {
        this.setState({ roomError: true });
        setTimeout((): void => {
          this.setState({ roomError: false });
        }, 2500);
      }
    }
  };

  /*
        Change the room state to the value which has been typed/clicked on in the dropdown menu
        or room text field.
    */
  private onRoomChange = (e): void => {
    this.setState({ room: e.target.value });
  };

  /*
        Change the name state to the value which has been typed in the name text field.
    */
  private onNameChange = (e): void => {
    this.setState({ name: e.target.value });
  };

  public render(): JSX.Element {
    document.title = "Join | Chatter";
    const { submitted, room, dropdownOpen, nameError, roomError, name } = this.state;
    /*
            If the user has not tried to connect to a room, the landing page will be shown t
            allow the user to choose a room.
        */
    if (!submitted) {
      return (
        <div className="landing__chat-container">
          <form className="landing__form" onSubmit={(e): void => this.onSubmit(e)}>
            <div className="landing__form--field">
              <h3 className="landing__title">Join a Chat</h3>
            </div>
            <div className="landing__form--field">
              <Label>Display name</Label>
              <Input
                type="text"
                id="nameInput"
                autoFocus
                onChange={(e): void => this.onNameChange(e)}
              />
            </div>
            <div className="landing__form--field">
              <Label>Room name</Label>
              <InputGroup id="roomInput">
                {/*
                    When the input is changed, it will update the room state with
                    the value which the user has input via the onRoomChange function.
                  */}

                <Input
                  type="text"
                  value={room}
                  onChange={(e): void => this.onRoomChange(e)}
                />
                <InputGroupButtonDropdown
                  addonType="append"
                  isOpen={dropdownOpen}
                  toggle={this.toggleDropDown}
                >
                  <DropdownToggle caret>Select</DropdownToggle>
                  <DropdownMenu>
                    {/* 
                                            onRoomChange() sets the current room state to be the same as 
                                            the chosen dropdown option
                                        */}
                    <DropdownItem header>Rooms</DropdownItem>
                    <DropdownItem
                      value="React & Redux"
                      onClick={(e): void => this.onRoomChange(e)}
                    >
                      React & Redux
                    </DropdownItem>
                    <DropdownItem
                      value="ES6+ JavaScript"
                      onClick={(e): void => this.onRoomChange(e)}
                    >
                      ES6+ JavaScript
                    </DropdownItem>
                    <DropdownItem
                      value="New Frameworks"
                      onClick={(e): void => this.onRoomChange(e)}
                    >
                      New Frameworks
                    </DropdownItem>
                    <DropdownItem
                      value="Discuss"
                      onClick={(e): void => this.onRoomChange(e)}
                    >
                      Discuss
                    </DropdownItem>
                    <DropdownItem
                      value="Design Ideas"
                      onClick={(e): void => this.onRoomChange(e)}
                    >
                      Design Ideas
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem
                      value="Chill Zone"
                      onClick={(e): void => this.onRoomChange(e)}
                    >
                      Chill Zone
                    </DropdownItem>
                  </DropdownMenu>
                </InputGroupButtonDropdown>
              </InputGroup>
            </div>
            <div className="landing__form--field">
              <Button color="success">Join {room}</Button>
            </div>
          </form>
          {/* Below are the error tooltips which fire when there is an error in the form input */}
          <Tooltip placement="top" isOpen={nameError} target="nameInput">
            Please insert a valid display name.
          </Tooltip>
          <Tooltip placement="bottom" isOpen={roomError} target="roomInput">
            Please insert a valid room name
          </Tooltip>
        </div>
      );
    }
    /*
      If the user has submitted a room to enter and a username, then the Chat component
      will be rendered, with the name and room as props passed to it.
    */
    return (
      <div>
        <Chat
          params={{
            name,
            room,
          }}
        />
      </div>
    );
  }
}

export default Landing;
