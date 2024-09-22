import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import jwtDecode from 'jwt-decode';

const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authTokens = localStorage.getItem('authTokens');

    if (authTokens) {
      try {
        const { access, refresh } = JSON.parse(authTokens);

        if (access) {
          const decodedToken = jwtDecode(access);
          const currentTime = Math.floor(Date.now() / 1000);

          if (decodedToken.exp < currentTime) {
            // Token expired
            Notify.failure('Session expired. Please log in again.');
            localStorage.removeItem('authTokens');
            navigate('/login');
          }
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error("Error decoding token or invalid token format:", error);
        Notify.failure('Invalid token. Please log in again.');
        localStorage.removeItem('authTokens');
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);
};

export default useAuthCheck;
