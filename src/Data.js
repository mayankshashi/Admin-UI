import axios from "axios";
const URL =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

export const getUsers = (setUsers) => {
  axios
    .get(URL)
    .then((res) => {
      const users = res.data;
      setUsers(
        users.map((data) => {
          data.selected = false;
          data.edit = false;
          data.show = true;
          return data;
        })
      );
    })
    .catch((error) => console.error(error));
};

export const searchUsers = (searchText, users) => {
  const searchTextInLowercase = searchText.toLowerCase();
  return users.map((elem) => {
    if (
      elem.name.toLowerCase().includes(searchTextInLowercase) ||
      elem.email.toLowerCase().includes(searchTextInLowercase) ||
      elem.role.toLowerCase().includes(searchTextInLowercase)
    ) {
      return elem;
    } else {
      elem.show = false;
      return elem;
    }
  });
};
