import React from 'react';
import { Link } from '@reach/router';
import { MainView, DashSummary, DashOptions } from '../theme';

export default function Dashboard({ summary, users, currency, transactions }) {
  return (
    <MainView>
      <DashSummary>
        {summary.totalOwed > 0 ? (
          <div>
            <figure>
              <span role="img" aria-label="cartwheel emoji">
                🤸🏼
              </span>
            </figure>
            <h2>
              {summary.overallLender} gets {currency}
              {summary.totalOwed}
            </h2>
          </div>
        ) : (
          <h2>
            Welcome, {users.lead}!<br />
            <br /> You and {users.partner} are all square.
          </h2>
        )}
      </DashSummary>
      <DashOptions>
        <Link to="/bills">
          <button>Split A Bill</button>
        </Link>
        {users.lead === summary.overallLender ? (
          <Link to="/call-it-even">
            <button>Call It Even</button>
          </Link>
        ) : (
          <Link to="/settle-up">
            <button>Settle Up</button>
          </Link>
        )}
      </DashOptions>
    </MainView>
  );
}
