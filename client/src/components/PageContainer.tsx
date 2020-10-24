/** @jsx jsx */
/*eslint-disable-next-line no-unused-vars*/
import React from 'react';
import { Router, RouteComponentProps } from '@reach/router';
import { jsx, css } from '@emotion/core';

// IMPORT PAGES
import Dashboard from '../pages/Dashboard';
import Transactions from '../pages/Transactions';
import CallItEven from '../pages/CallItEven';
import SettleUp from '../pages/SettleUp';
import History from '../pages/History';
import Inspect from '../pages/Inspect';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import SignUp from '../pages/SignUp';
import Settings from '../pages/Settings';
import About from '../pages/About';

import { Users, Transaction, Summary } from '../interfaces';

interface PageContainerProps extends RouteComponentProps {
  users: Users;
  transactions: Transaction[];
  setUsers: Function;
  setTransactions: Function;
  currency: string;
  setCurrency: Function;
  summary: Summary;
  isAuthenticated: boolean;
  setIsAuthenticated: Function;
  setIsLoading: Function;
  isLoading: boolean;
  _id: string;
}
const PageContainer: React.FC<PageContainerProps> = ({
  users,
  setUsers,
  transactions,
  setTransactions,
  currency,
  setCurrency,
  summary,
  isAuthenticated,
  setIsAuthenticated,
  setIsLoading,
  isLoading,
  _id,
}) => {
  return (
    <Router
      css={css`
        width: 100vw;
        padding: 0 5vw;
        flex: 1;
      `}
    >
      <RouterPage path="/about" pageComponent={<About />} />
      {/*<About path="/about" />*/}
      <RouterPage
        path="/"
        pageComponent={
          <Dashboard
            users={users}
            currency={currency}
            summary={summary}
            isAuthenticated={isAuthenticated}
          />
        }
      />
      {/*<Dashboard
        path="/"
        users={users}
        currency={currency}
        summary={summary}
        isAuthenticated={isAuthenticated}
        setIsLoading={setIsLoading}
      />*/}
      <RouterPage
        path="/transactions"
        pageComponent={
          <Transactions
            users={users}
            currency={currency}
            setTransactions={setTransactions}
            setIsLoading={setIsLoading}
          />
        }
      />
      {/*<Transactions
        path="/transactions"
        users={users}
        currency={currency}
        setTransactions={setTransactions}
        isAuthenticated={isAuthenticated}
      setIsLoading={setIsLoading}/>*/}
      <RouterPage
        path="/call-it-even"
        pageComponent={
          <CallItEven
            summary={summary}
            users={users}
            currency={currency}
            setTransactions={setTransactions}
            setIsLoading={setIsLoading}
          />
        }
      />

      {/*<CallItEven
        path="/call-it-even"
        summary={summary}
        users={users}
        currency={currency}
        setTransactions={setTransactions}ƒ
        isAuthenticated={isAuthenticated}
      setIsLoading={setIsLoading}
      />*/}
      <RouterPage
        path="/settle-up"
        pageComponent={
          <SettleUp
            summary={summary}
            users={users}
            currency={currency}
            setTransactions={setTransactions}
            setIsLoading={setIsLoading}
          />
        }
      />
      {/*<SettleUp
        path="/settle-up"
        summary={summary}
        users={users}
        currency={currency}
        setTransactions={setTransactions}
        isAuthenticated={isAuthenticated}
        setIsLoading={setIsLoading}
      />*/}
      <RouterPage
        path="/history"
        pageComponent={
          <History
            transactions={transactions}
            currency={currency}
            users={users}
          />
        }
      />
      {/*<History
        path="/history"
        transactions={transactions}
        currency={currency}
        users={users}
        isAuthenticated={isAuthenticated}
      />*/}

      {/* <RouterPage
        path="/transactions/:_id"
        pageComponent={
          <Inspect
            users={users}
            currency={currency}
            setTransactions={setTransactions}
            setIsLoading={setIsLoading}
            _id={_id}
          />
        }
      /> */}

      <Inspect
        path="/transactions/:_id"
        users={users}
        currency={currency}
        setTransactions={setTransactions}
        setIsLoading={setIsLoading}
      />
      <RouterPage
        path="/settings"
        pageComponent={
          <Settings
            currency={currency}
            setCurrency={setCurrency}
            users={users}
            setUsers={setUsers}
            setIsLoading={setIsLoading}
          />
        }
      />

      {/*<Settings
        path="/settings"
        currency={currency}
        setCurrency={setCurrency}
        users={users}
        setUsers={setUsers}
        setTransactions={setTransactions}
        isAuthenticated={isAuthenticated}
        setIsLoading={setIsLoading}
      />*/}
      <RouterPage
        path="/login"
        pageComponent={
          <Login
            setIsAuthenticated={setIsAuthenticated}
            setIsLoading={setIsLoading}
          />
        }
      />
      {/*<Login
        path="/login"
        setIsAuthenticated={setIsAuthenticated}
        setIsLoading={setIsLoading}
      />*/}
      <RouterPage
        path="/logout"
        pageComponent={
          <Logout
            setIsAuthenticated={setIsAuthenticated}
            setIsLoading={setIsLoading}
          />
        }
      />

      {/*<Logout
        path="/logout"
        setIsAuthenticated={setIsAuthenticated}
        setIsLoading={setIsLoading}
      />*/}
      <RouterPage
        path="/sign-up"
        pageComponent={
          <SignUp
            setIsAuthenticated={setIsAuthenticated}
            setIsLoading={setIsLoading}
          />
        }
      />

      {/*<SignUp
        path="/sign-up"
        setIsAuthenticated={setIsAuthenticated}
        setIsLoading={setIsLoading}
      />*/}
    </Router>
  );
};

export default PageContainer;

const RouterPage = (
  // eslint-disable-next-line no-undef
  props: { pageComponent: JSX.Element } & RouteComponentProps,
) => props.pageComponent;
