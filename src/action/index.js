import { TRANSACTIONS,TOTAL } from "../redux/actionType";
import { onSnapshot, collection } from '@firebase/firestore'
import db from '../firebase';

export const getTransactionsAction = (attributes) => async dispatch => {
  try {
    const snapshotPromise = new Promise(resolve => {
      onSnapshot(collection(db, "Transactions"), (snapshot) => {
        const transactions = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        resolve(transactions);
      });
    });

    const transactions = await snapshotPromise;
   
    dispatch({
      type: TRANSACTIONS,
      transactions
    });
    return transactions;
  } catch (err) {
    console.error("Error fetching transactions:", err);
  }
};

export const getBalanceAction = (attributes) => async dispatch => {
    try {
      const snapshotPromise = new Promise(resolve => {
        onSnapshot(collection(db, "total"), (snapshot) => {
          const total = snapshot.docs.map((doc) => (doc.data()))
          resolve(total);
        });
      });
  
      const total = await snapshotPromise;
      dispatch({
        type: TOTAL,
        total
      });
      return total;
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };
