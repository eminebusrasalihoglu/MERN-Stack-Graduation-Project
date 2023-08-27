import React from 'react';

const Confirm = ({ onConfirm, onCancel }) => {
  return (
    <div>
      <p>Emin misiniz?</p>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onCancel}>No</button>
    </div>
  );
};

export default Confirm;
