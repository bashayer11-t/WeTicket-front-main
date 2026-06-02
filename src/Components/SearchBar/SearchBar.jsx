import React from 'react';
import styles from './SearchBar.module.css';
import background from '..//../assets/background.avif'; // تأكدي من مسار الصورة صح

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className={styles.heroContainer} style={{ backgroundImage: `url(${background})` }}>
      <div className={styles.overlay}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search for activity"
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={styles.searchIcon}>
             🔍 {/* تقدري تستبدليها بأيقونة من FontAwesome أو SVG */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
