import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function GoogleLoginButton() {
  type TDecodedToken = {
    name: string;
  };
  const navigate = useNavigate();

  return (
    <div className="google-login-button">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const decoded: TDecodedToken = jwtDecode(
            credentialResponse?.credential
          );
          console.log(decoded.name);
          navigate('/rooms-form', { state: { userName: decoded.name } });
        }}
        onError={() => {
          console.log('Login failed');
        }}
      />
    </div>
  );
}

export default GoogleLoginButton;
