// src/Components/Card/Card.jsx
import React from 'react';
import styles from './Card.module.css';

export default function Card({ title, location, image }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {/*src يجب أن تأخذ قيمة image الممرة من الهوم */}
        <img src={image} alt={title} className={styles.cardImg} />
      </div>
      <div className={styles.cardBody}>
        <h3>{title}</h3>
        <p>{location}</p>
      </div>
    </div>
  );
}
