import React from 'react';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';

interface GoogleLoginButtonProps {
  onSuccess: (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => void;
  onFailure: (error: Error) => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  onSuccess,
  onFailure,
}) => {
  return (
    <GoogleLogin
      clientId="tu-client-id"
      buttonText="Iniciar sesión con Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginButton;
export type { GoogleLoginResponse, GoogleLoginResponseOffline }; // Utiliza 'export type' para re-exportar tipos
