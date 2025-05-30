import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const Home = (): JSX.Element => {
  const navigate = useNavigate();
  const handleLoginSuccess = (response: CredentialResponse) => {
    navigate('/marketplace')

    if (!response.credential) {
      alert("Login Failed: No credentials received");
      return;
    }

    const base64Url = response.credential.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const data = JSON.parse(jsonPayload);

    sessionStorage.setItem('user', JSON.stringify({
      email: data.email,
      name: data.given_name,
      picture: data.picture,
    }));
  }

  return (
    <main id='landingMain'>
      <img id='marketplaceLogo' src='/images/marketplace-mini-logo.png' alt='Marketplace-logo' />
      <h1>Fintech Marketplace</h1>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => {
          alert("Login Failed");
        }}
      />
    </main>
  );
};

export default Home;
