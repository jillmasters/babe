import React from 'react';
import { MainView, AboutPage } from '../theme';

import Lottie from 'react-lottie';
import mates from '../animations/mates.json';

const pals = {
  loop: true,
  autoplay: true,
  animationData: mates,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const About = () => {
  return (
    <MainView>
      <h4>
        <span role="img" aria-label="confused person emoji">
          🤷
        </span>
        Why use Babe?
        <span role="img" aria-label="confused person emoji">
          🤷
        </span>
      </h4>
      <AboutPage>
        <h2>
          <span id="babify">Babe </span>is a low-maintenance bill-splitter for
          two people.
        </h2>
        <br />
        <Lottie options={pals} height={200} width={200} />
        <br />
        <h2> It's for folks with shared lives and sole bank accounts.</h2>
        <br />

        <h5>
          Users get a simple balance, saying which person is owed money overall.
        </h5>
        <h5>
          You can add new, customised bills, view your transaction history,
          'call it even', or settle up.
        </h5>
        <h5>
          There's no fuss, no finicky details, and no direct requests for
          repayment. So you can share your life without invoicing the people you
          love.
        </h5>
      </AboutPage>
    </MainView>
  );
};

export default About;
