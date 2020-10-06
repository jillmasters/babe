import React from 'react';
import { Link, navigate } from '@reach/router';
import { MainViewStatic, DashOptions } from '../theme';

import UserService from '../services/UserService';
import authentication from '../authentication';

import Lottie from 'react-lottie';
import mates from '../animations/mates.json';

const cya = {
  loop: true,
  autoplay: true,
  animationData: mates,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

interface LogoutProps {
  setIsAuthenticated: Function,
  setIsLoading: Function,
}

const Logout: React.FC<LogoutProps> = ({ setIsAuthenticated, setIsLoading }) => {
  const removeToken = () => {
    UserService.logout('accessToken');
  };

  const deauthenticate = () => {
    setIsAuthenticated(false);
    authentication.logout(() => navigate('/', { replace: true }));
  };

  const handleLogout = () => {
    removeToken();
    deauthenticate();
    setIsLoading(true);
  };

  return (
    <MainViewStatic data-testid="logout">
      <h4>
        <span role="img" aria-label="technologist emoji">
          🧑‍💻
        </span>
        Logout
        <span role="img" aria-label="technologist emoji">
          🧑‍💻
        </span>
      </h4>
      <br />
      <br />
      <Lottie options={cya} height={250} width={250} />
      <DashOptions>
        <button onClick={handleLogout}>Log me out</button>
        <Link to="/">
          <button>Take me home</button>
        </Link>
      </DashOptions>
    </MainViewStatic>
  );
};

export default Logout;
