import React, { useState, useEffect } from 'react';

// GET COMPONENTS AND SERVICES
import Head from './components/Head';
import Header from './components/Header';
import PageContainer from './components/PageContainer';
import Footer from './components/Footer';
import APIService from './services/APIService';

function App() {
  // MAIN APP DATA (STATE)
  const app = {
    name: 'Babe',
    description: 'Fast, unfussy bill-splitting for couples',
  };
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState({ lead: 'Jill', partner: 'Sam' });
  const [currency, setCurrency] = useState('£');

  // LOAD DASHBOARD INFO
  useEffect(() => {
    APIService.getTransactions()
      .then(dbTransactions => setTransactions(dbTransactions))
      .catch(error => console.log('---> Error loading history', error)); // eslint-disable-line no-console
  }, []);

  // LOAD MAIN PAGE LAYOUT
  return (
    <main>
      <Head app={app} />
      <Header app={app} />
      <PageContainer
        users={users}
        transactions={transactions}
        setTransactions={setTransactions}
        currency={currency}
      />
      <Footer />
    </main>
  );
}

export default App;
