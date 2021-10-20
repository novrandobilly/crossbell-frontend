import React from 'react';
import styles from './MainDrawer.module.scss';

const MainDrawer = props => {
  return <header className={styles.MainDrawer}>{props.children}</header>;
};

export default MainDrawer;
