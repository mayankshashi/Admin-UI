import { getTotalPages } from "../Page";

import styles from "./BottomNav.module.css";

const BottomNav = (props) => {
  const { usersLength, page, setPage, deleteSelected } = props;

  const totalPages = getTotalPages(usersLength);
  const changePage = (index) => {
    setPage(index);
  };

  const navigatePage = (index) => {
    if (index < 1) {
      index = 1;
    } else if (index > totalPages) {
      index = totalPages;
    }
    setPage(index);
  };

  let pages = [];
  pages.push(
    <div
      key={-3}
      className={`${styles.page} ${page === 1 ? styles.disabled : ""}`}
      onClick={() => changePage(1)}
    >
      <i className="fas fa-angle-double-left"></i>
    </div>
  );
  pages.push(
    <div
      key={-2}
      className={`${styles.page} ${page === 1 ? styles.disabled : ""}`}
      onClick={() => navigatePage(page - 1)}
    >
      <i className="fas fa-angle-left"></i>
    </div>
  );
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <div
        key={i}
        onClick={() => changePage(i)}
        className={`${styles.page} ${page === i ? styles.selected : ""}`}
      >
        {i}
      </div>
    );
  }
  pages.push(
    <div
      key={-1}
      className={`${styles.page} ${page === totalPages ? styles.disabled : ""}`}
      onClick={() => navigatePage(page + 1)}
    >
      <i className="fas fa-angle-right"></i>
    </div>
  );
  pages.push(
    <div
      key={0}
      className={`${styles.page} ${page === totalPages ? styles.disabled : ""}`}
      onClick={() => changePage(totalPages)}
    >
      <i className="fas fa-angle-double-right"></i>
    </div>
  );

  return (
    <div className={styles.bottomNavContainer}>
      <button className={styles.delete} onClick={() => deleteSelected()}>
        Delete Selected
      </button>
      <div className={styles.bottomNav}>{pages}</div>
    </div>
  );
};

export default BottomNav;
