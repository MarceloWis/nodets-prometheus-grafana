import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    const transactions = this.transactions;
    return transactions;
  }

  public getBalance(): Balance {
    const transactions = this.transactions;

    const income = transactions
      .filter(transactions => transactions.type === 'income')
      .reduce((incomeSum, currentValue) => incomeSum + currentValue.value, 0);
    const outcome = transactions
      .filter(transactions => transactions.type === 'outcome')
      .reduce((outcomeSum, currentValue) => outcomeSum + currentValue.value, 0);

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;