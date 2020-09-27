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
          <div>
            <figure>
              <span role="img" aria-label="confetti emoji">
                🎊
              </span>
            </figure>
            <h2>
              Welcome, <span id="babify">{users.lead}</span> !
            </h2>
            <h2> You and {users.partner} are all square.</h2>
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
    </MainView>
  );
}
