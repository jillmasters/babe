import summariseTransactions from './calculate';

const users = {
  lead: 'a',
  leadEmail: 'a@test',
  partner: 'b',
  partnerEmail: 'b@test',
};

test('Calculates transactions with A being the overall lender', () => {
  const transactions = [
    {
      amount: 5,
      lender: 'b@test',
      split: 30,
    },
    {
      amount: 5,
      lender: 'a@test',
      split: 70,
    },
    {
      amount: 10,
      lender: 'b@test',
      split: 50,
    },
    {
      amount: 10,
      lender: 'Babe',
      split: -1,
    },
    {
      lender: 'a@test',
      amount: 20.5,
      split: 50,
    },
  ];

  expect(summariseTransactions(transactions, users)).toEqual({
    balance: 15.25,
    overallLender: 'a',
    totalOwed: 15,
  });
});

test('Calculates transactions with B being the overall lender', () => {
  const transactions = [
    {
      amount: 5,
      lender: 'b@test',
      split: 50,
    },
  ];

  expect(summariseTransactions(transactions, users)).toEqual({
    balance: -2.5,
    overallLender: 'b',
    totalOwed: 2,
  });
});

test('Returns default value for no transactions', () => {
  expect(summariseTransactions(null, users)).toEqual({
    //TODO: CHeck that this check in calculate.js actually makes sense
    balance: 0,
    overallLender: '-', //TODO
    totalOwed: 0,
  });
});
