import React, { useState } from 'react';
import styles from './ShareSplitModal.module.css'
import Image from "next/image";

const ShareEventModal: React.FC = () => {
  
  return (
    <div className={styles.modal}>
      <h2>Поделиться сплитом</h2>
      <div>
        <label className={styles.input}>
        <span className={styles.share}>Для Редактирования:</span>
          <div className={styles.copylink}>
            <span className={styles.link}>
              ССЫЛКА
            </span>
            <Image className={styles.copy} src="/copy.svg" height={20} alt='copy icon' width={20} />
            </div> 
        </label>
      </div>
        <label className={styles.input}>
          <span className={styles.share}>Для ппросмотра:</span>
          <div className={styles.copylink}>
            <span className={styles.link}>
            ССЫЛКА
            </span>
            <Image className={styles.copy} src="/copy.svg" height={20} alt='copy icon' width={20} />
          </div>
        </label>
    </div>
  );
};

export default ShareEventModal;
