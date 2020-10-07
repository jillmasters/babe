export interface Transaction {
  addedBy?: string;
  amount: number;
  date: Date | string;
  item: string;
  lender: string;
  split: number;
  __v?: number;
  _id?: string;
  balance?: number;
  totalOwed?: number;
  overallLender?: string;
}
export interface Users {
  _id: string;
  lead: string;
  leadEmail?: string;
  partner: string;
  partnerEmail: string;
  email?: string;
  name?: string;
  currency?: string;
}
export interface Summary {
  balance: number;
  totalOwed: number;
  overallLender: string;
}
