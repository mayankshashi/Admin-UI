import { useRef } from "react";

import styles from "./UserAction.module.css";

const User = (props) => {
  const { user, deleteUser, editUser, saveUser, selectOne } = props;

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const roleRef = useRef(null);

  return (
    <tr key={user.id} className={user.selected ? styles.selected : ""}>
      <td>
        <label htmlFor={`check-${user.id}`}>
          <input
            id={`check-${user.id}`}
            type="checkbox"
            data={`${user.selected}`}
            onChange={() => selectOne(user.id)}
            checked={user.selected}
          ></input>
        </label>
      </td>
      <td>
        <input
          className={user.edit ? styles.editable : styles.readOnly}
          readOnly={!user.edit}
          type="text"
          ref={nameRef}
          name="name"
          defaultValue={user.name}
        ></input>
      </td>
      <td>
        <input
          className={user.edit ? styles.editable : styles.readOnly}
          readOnly={!user.edit}
          type="email"
          ref={emailRef}
          name="email"
          defaultValue={user.email}
        />
      </td>
      <td>
        <input
          className={user.edit ? styles.editable : styles.readOnly}
          readOnly={!user.edit}
          type="text"
          ref={roleRef}
          name="role"
          defaultValue={user.role}
        />
      </td>
      <td className={styles.icons}>
        {user.edit ? (
          <i
            onClick={() => saveUser(user.id, nameRef, emailRef, roleRef)}
            className="fas fa-save"
          ></i>
        ) : (
          <td className={styles.edit}>
            <i onClick={() => editUser(user.id)} className="fas fa-edit"></i>
          </td>
        )}
        <td className={styles.del}>
          <i
            onClick={() => deleteUser(user.id)}
            className="fas fa-trash-alt"
          ></i>
        </td>
      </td>
    </tr>
  );
};

export default User;
