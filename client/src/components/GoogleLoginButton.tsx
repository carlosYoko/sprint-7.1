import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

type TDecodedToken = {
  name: string;
};

function GoogleLoginButton() {
  const navigate = useNavigate();

  return (
    <div className="google-login-button">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const credential = credentialResponse?.credential;
          if (credential) {
            const decoded: TDecodedToken = jwtDecode(credential);
            console.log(decoded.name);
            navigate('/rooms-form', { state: { userName: decoded.name } });
          } else {
            console.log('Error al hacer login');
          }
        }}
        onError={() => {
          console.log('Error al hacer login');
        }}
      />
    </div>
  );
}

export default GoogleLoginButton;
