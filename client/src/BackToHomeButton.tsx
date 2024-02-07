import React from 'react';

type TPropsName = {
  setAccepted: React.Dispatch<React.SetStateAction<boolean>>;
};

const BackToHomeButton: React.FC<TPropsName> = ({ setAccepted }) => {
  const handleBackToHome = () => {
    setAccepted(false);
  };

  return <button onClick={handleBackToHome}>Salir de la sala</button>;
};

export default BackToHomeButton;
