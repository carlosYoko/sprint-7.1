import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function GoogleLoginButton() {
  const navigate = useNavigate();

  return (
    <>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const decoded = jwtDecode(credentialResponse?.credential);
          console.log(decoded.name);
          navigate('/rooms-form', { state: { userName: decoded.name } });
        }}
        onError={() => {
          console.log('Login failed');
        }}
      />
    </>
  );
}

export default GoogleLoginButton;
