import React from 'react';

type TPropsName = {
  setAccepted: React.Dispatch<React.SetStateAction<boolean>>;
};

const BackToHomeButton: React.FC<TPropsName> = ({ setAccepted }) => {
  const handleBackToHome = () => {
    setAccepted(false); // Establece el estado accepted en false para volver a mostrar el componente Home
  };

  return <button onClick={handleBackToHome}>Salir del chat</button>;
};

export default BackToHomeButton;
