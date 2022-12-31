import React, { useState, useEffect, useRef } from "react";

import "./App.css";
import BottomNav from "./components/BottomNav";
import UsersList from "./components/UserList";
import config from "./config";
import { getUsers, searchUsers } from "./Data";
import { getRecordIndex } from "./Page";

export default function App() {
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(false);
  const [page, setPage] = useState(1);
  const ref = useRef(0);

  useEffect(() => {
    getUsers(setUsers);
  }, []);

  const searchUser = (e) => {
    setPage(1);
    setUsers(searchUsers(e.target.value, users));
  };

  const deleteUser = (id) => {
    let tempUsers = users.filter((user) => user.id !== id);
    setUsers(tempUsers);
    setUpdate((prevState) => !prevState);
  };

  const editUser = (id) => {
    let tempUsers = users;
    const index = tempUsers.findIndex((user) => user.id === id);
    tempUsers[index].edit = true;
    setUsers(tempUsers);
    setUpdate((prevState) => !prevState);
  };

  const saveUser = (id, nameRef, emailRef, roleRef) => {
    let tempUsers = users;
    const index = tempUsers.findIndex((user) => user.id === id);
    tempUsers[index].name = nameRef.current.value;
    tempUsers[index].email = emailRef.current.value;
    tempUsers[index].role = roleRef.current.value;
    tempUsers[index].edit = false;
    setUsers(tempUsers);
    setUpdate((prevState) => !prevState);
  };

  const selectOne = (id) => {
    let tempUsers = users;
    const index = tempUsers.findIndex((user) => user.id === id);
    tempUsers[index].selected = !tempUsers[index].selected;
    setUsers(tempUsers);
    setUpdate((prevState) => !prevState);
  };

  const selectAll = (e) => {
    const listedUserIds = users
      .filter((user) => user.show)
      .slice(index, index + config.PAGE_SIZE)
      .map((user) => user.id);

    let tempUsers = users.map((user) => {
      if (listedUserIds.includes(user.id)) {
        user.selected = e.target.checked;
        return user;
      }
      return user;
    });

    setUsers(tempUsers);
    setUpdate(!update);
  };

  const deleteSelected = () => {
    if (window.confirm("Selected users will be deleted")) {
      setUsers((prevState) => prevState.filter((user) => !user.selected));
      ref.current.checked = false;
    }
  };

  const index = getRecordIndex(page);
  return (
    <div className="App">
      <input
        className="search"
        type="text"
        placeholder="Search by name, email or role"
        onChange={searchUser}
      ></input>
      <UsersList
        page={page}
        setPage={setPage}
        selectAll={selectAll}
        ref={ref}
        selectOne={selectOne}
        saveUser={saveUser}
        editUser={editUser}
        deleteUser={deleteUser}
        users={users
          .filter((user) => user.show)
          .slice(index, index + config.PAGE_SIZE)}
      ></UsersList>
      <BottomNav
        usersLength={users.filter((user) => user.show).length}
        page={page}
        setPage={setPage}
        deleteSelected={deleteSelected}
      ></BottomNav>
    </div>
  );
}
