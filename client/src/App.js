import React, { useState, useEffect } from 'react';

// GET COMPONENTS
import Head from './components/Head';
import Header from './components/Header';
import PageContainer from './components/PageContainer';
import Footer from './components/Footer';

// GET SERVICES
import TransactionService from './services/TransactionService';
import UserService from './services/UserService';
import authentication from './authentication';

function App() {
  // SET STATE
  const currentAuthentication = authentication.isAuthenticated();
  const [isAuthenticated, setIsAuthenticated] = useState(currentAuthentication);
  const [transactions, setTransactions] = useState([]);
  const [currency, setCurrency] = useState('');
  const [users, setUsers] = useState({
    _id: '',
    lead: '',
    leadEmail: '',
    partner: '',
    partnerEmail: '',
  });
  const [summary, setSummary] = useState({
    balance: 0,
    totalOwed: 0,
    overallLender: '',
  });

  const retrieveUserInfo = async accessToken => {
    try {
      const userInfo = await UserService.loadUserDetails(accessToken);
      const { _id, email, name, partner, partnerEmail, currency } = userInfo;
      setUsers({ _id, lead: name, leadEmail: email, partner, partnerEmail });
      setCurrency(currency);
    } catch (error) {
      console.log('---> Unable to retrieve user data', error); // eslint-disable-line no-console
    }
  };

  const calculateSummary = () => {
    if (transactions) {
      const balance = transactions.reduce((acc, transaction) => {
        if (transaction.lender === users.leadEmail)
          return acc + (transaction.amount * (100 - transaction.split)) / 100;
        else if (transaction.lender === users.partnerEmail)
          return acc - transaction.amount * (transaction.split / 100);
        else {
          const remaining = transaction.amount * transaction.split;
          return acc - remaining;
        }
      }, 0);
      const overallLender = balance > 0 ? users.lead : users.partner;
      const totalOwed = Math.abs(Math.round(balance));
      setSummary({ balance, totalOwed, overallLender });
    }
  };

  // LOAD DASHBOARD INFO
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    retrieveUserInfo(accessToken);
    if (users._id) {
      TransactionService.getTransactions(users._id)
        .then(dbTransactions => setTransactions(dbTransactions))
        .catch(error => console.log('---> Error loading user history', error)); // eslint-disable-line no-console
      calculateSummary();
    }
  }, []);

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
