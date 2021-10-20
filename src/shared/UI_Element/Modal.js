import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';

import styles from './Modal.module.scss';
import CloseButton from '../../assets/icons/x-mark.svg';

const ModalOverlay = props => {
  const content = (
    <div className={`${styles.Modal} ${props.ContainerClass}`} style={props.style}>
      <header className={`${styles.Header} ${props.HeaderClass}`}>
        <h2>{props.headerText}</h2>
        <div className={styles.CloseButton} onClick={props.onCancel}>
          <img alt='Close button' src={CloseButton} />
        </div>
      </header>
      <div className={styles.ModalContent}>
        <div className={`${styles.Content} ${props.ContentClass}`}>{props.children}</div>
        <footer className={`${styles.Footer} ${props.FooterClass}`}>{props.footerText}</footer>
      </div>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = props => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={200} classNames='Modal'>
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
