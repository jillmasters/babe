import React, { useState, useEffect } from 'react';

// GET COMPONENTS AND SERVICES
import Head from './components/Head';
import Header from './components/Header';
import PageContainer from './components/PageContainer';
import Footer from './components/Footer';
import TransactionService from './services/TransactionService';
import auth from './authentication';

function App() {
  // STATE
  const initialState = auth.isAuthenticated();
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);

  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState({ lead: 'Jill', partner: 'Sam' });
  const [currency, setCurrency] = useState('£');

  // LOAD DASHBOARD INFO
  useEffect(() => {
    TransactionService.getTransactions()
      .then(dbTransactions => setTransactions(dbTransactions))
      .catch(error => console.log('---> Error loading history', error)); // eslint-disable-line no-console
  }, []);

  // reduce transactions into overall balance summary
  const summary = {};
  summary.balance = transactions.reduce((acc, transaction) => {
    if (transaction.lender === users.lead)
      return acc + (transaction.amount * (100 - transaction.split)) / 100;
    else if (transaction.lender === users.partner)
      return acc - transaction.amount * (transaction.split / 100);
    else {
      const remaining = transaction.amount * transaction.split;
      return acc - remaining;
    }
  }, 0);
  summary.overallLender = summary.balance > 0 ? users.lead : users.partner;
  summary.totalOwed = Math.abs(Math.round(summary.balance));

  // LOAD MAIN PAGE LAYOUT
  return (
    <main>
      <Head />
      <Header />
      <PageContainer
        summary={summary}
        users={users}
        setUsers={setUsers}
        transactions={transactions}
        setTransactions={setTransactions}
        currency={currency}
        setCurrency={setCurrency}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <Footer isAuthenticated={isAuthenticated} />
    </main>
  );
}

export default App;
