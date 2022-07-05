import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './modal.module.css';

const modal = document.getElementById('modal');

const Modal = props => {
  const { children, closeModal } = props;

  useEffect(() => {
    document.addEventListener('keydown', handleClose);
    return () => document.removeEventListener('keydown', handleClose);
  });

  function handleClose({ target, currentTarget, code }) {
    if (target === currentTarget || code === 'Escape') {
      closeModal();
    }
  }

  return createPortal(
    <div className={s.overlay} onClick={handleClose}>
      <div className={s.modal}>{children}</div>
    </div>,
    modal
  );
};

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
