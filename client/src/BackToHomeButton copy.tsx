import React from 'react';

type TPropsName = {
  setAccepted: React.Dispatch<React.SetStateAction<boolean>>;
};

const BackToHomeButton: React.FC<TPropsName> = ({ setAccepted }) => {
  const handleBackToHome = () => {
    setAccepted(false);
  };

  return <button onClick={handleBackToHome}>Cerrar sesión</button>;
};

export default BackToHomeButton;
