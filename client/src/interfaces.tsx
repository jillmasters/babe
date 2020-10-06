import React from 'react';

export interface Transaction {
  addedBy?: string,
  amount: number, //fix
  date: string,
  item: string,
  lender: string,
  split: any, // fix
  __v?: number,
  _id?: string,
  balance?: number,
  totalOwed?: number,
  overallLender?: string, // fix
};
export interface Users {
  _id: string,
  lead: string,
  leadEmail?: string,
  partner: string,
  partnerEmail: string
  email?: string,
  name?: string,
  currency?: string,
}
export interface Summary {
    balance: number,
    totalOwed: number,
    overallLender: string,
}
