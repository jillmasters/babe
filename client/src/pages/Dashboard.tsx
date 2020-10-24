/** @jsx jsx */
/*eslint-disable-next-line no-unused-vars*/
import React from 'react';
import { Link } from '@reach/router';
import { MainView, DashSummary, DashOptions } from '../theme';
import { jsx, css } from '@emotion/core';

import Lottie from 'react-lottie';
import piggyBank from '../animations/piggy-bank.json';
import confetti from '../animations/confetti.json';
import { Summary, Users } from '../interfaces';

const pig = {
  loop: false,
  autoplay: true,
  animationData: piggyBank,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const celebrate = {
  loop: true,
  autoplay: true,
  animationData: confetti,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};
interface DashboardProps {
  summary: Summary;
  currency: string;
  users: Users;
  isAuthenticated: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({
  summary,
  users,
  currency,
  isAuthenticated,
}) => {
  return (
    <MainView data-testid="dashboard">
      {isAuthenticated ? (
        <React.Fragment>
          <DashSummary>
            {summary.totalOwed > 0 ? (
              <div>
                <Lottie options={pig} height={250} width={250} />
                <h2>
                  {summary.overallLender} gets {currency}
                  {summary.totalOwed}
                </h2>
              </div>
            ) : (
              <div
                css={css`
                  position: relative;
                  height: 100%;
                  width: 100%;
                `}
              >
                <Lottie options={celebrate} />
                <div
                  css={css`
                    position: absolute;
                    top: 40%;
                    bottom: 40%;
                    left: 8%;
                    right: 8%;
                    z-index: 10;
                  `}
                >
                  <h2>
                    Welcome, <span id="babify">{users.lead}</span> !
                  </h2>
                  <h3> You and {users.partner} are all square.</h3>
                </div>
              </div>
            )}
          </DashSummary>
          <DashOptions>
            <Link to="/transactions">
              <button>Split A Bill</button>
            </Link>
            {summary.totalOwed === 0 ? null : users.partner ===
              summary.overallLender ? (
              <Link to="/settle-up">
                <button>Settle Up</button>
              </Link>
            ) : (
              <Link to="/call-it-even">
                <button>Call It Even</button>
              </Link>
            )}
          </DashOptions>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <DashSummary>
            <div>
              <Lottie options={pig} height={250} width={250} />
              <h2>
                Welcome to <span id="babify">Babe</span>
              </h2>
              <h5>Sign up or login to get started</h5>
            </div>
          </DashSummary>
          <DashOptions>
            <Link to="/about">
              <button>
                What does <span id="babify">Babe</span> do?
              </button>
            </Link>
          </DashOptions>
        </React.Fragment>
      )}
    </MainView>
  );
};
export default Dashboard;
