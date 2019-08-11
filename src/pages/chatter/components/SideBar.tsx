import React, { useEffect, useState } from "react";
import uuid from "uuid/v4";

const SideBar = ({ socket }): JSX.Element => {
  const [users, setUsers] = useState([]);
  useEffect((): void => {
    socket.on("updateUserList", (usersArr): void => {
      setUsers(usersArr);
    });
  }, []);
  return (
    <div className="sidebar__container">
      <div className="sidebar__header">Chatter</div>
      <h3 className="sidebar__title">Users</h3>
      <div className="sidebar__users-container">
        {users.map(
          (user): JSX.Element => (
            <div className="sidebar__user" key={uuid()}>
              {user}
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default SideBar;
