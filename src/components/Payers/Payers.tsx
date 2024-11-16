import { useState } from "react";
import AxiosInstance from "@/api/instance";
import styles from "./Payers.module.css";

interface PaymentRecord {
  [payee: string]: number;
}

export interface PayersData {
  [payer: string]: PaymentRecord;
}

export interface PayersProps {
  titleText: string;
  payments: PayersData;
  eventID: string;
}

const Payers = (props: PayersProps) => {
  const [payments, setPayments] = useState<PayersData>(props.payments);
  const [acceptModal, setAcceptModal] = useState(false);

  const handlePayeeClick = async (payer: string, payee: string) => {
    if (!acceptModal) {
      setAcceptModal(true);
      return
    }

    const currentStatus = payments[payer][payee] === 0;
    const newStatus = !currentStatus;

    setPayments((prevPayments) => ({
      ...prevPayments,
      [payer]: {
        ...prevPayments[payer],
        [payee]: 0
      },
    }));
    setAcceptModal(false)

    try {
      await AxiosInstance.put(`/event/${props.eventID}/splits`, {
        username: payee,
        paid: newStatus,
      });
    } catch (error) {
      setPayments((prevPayments) => ({
        ...prevPayments,
        [payer]: {
          ...prevPayments[payer],
          [payee]: 0
        },
      }));
    }
  };

  return (
    <div className={styles.paymentsContainer}>
      <h2>{props.titleText}</h2>
      <ul className={styles.paymentUsers}>
        {Object.entries(payments).map(([payer, payees], payerIndex) => {
          const sortedPayees = Object.entries(payees).sort(([payeeA, detailsA], [payeeB, detailsB]) => {
            return detailsA === detailsB ? 0 : detailsA === 0 ? 1 : -1;
          });

          return (
            sortedPayees.length > 0 ? (
              <li key={payerIndex} className={styles.paymentUser}>
                <span>У {payer}:</span>
                <ul className={styles.payeeList}>
                  {sortedPayees.map(([payee, amount], payeeIndex) => (
                    <li key={payeeIndex} className={styles.payeeItem}>
                      <div className={styles.overlay} style={{display: acceptModal ? 'flex' : 'none'}}>
                        <div className={styles.accept}>
                          Вы точно хотите подтвердить оплату?
                          <div className={styles.yes} onClick={() => handlePayeeClick(payer, payee)}>
                            Да
                          </div>
                          <div className={styles.no} onClick={() => setAcceptModal(false)}>
                            Нет
                          </div>
                        </div>
                      </div>
                      <span
                        onClick={() => handlePayeeClick(payer, payee)}
                        className={`${styles.payeeName} ${amount === 0 ? styles.paid : ""}`} // Условно применяем класс
                      >
                        {payee} - {amount} RUB
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            ) : <div>В данном событии нет должников</div>
          );
        })}
      </ul>
      <span style={{marginTop: 20}}>Нажмите на имя, чтобы отметить оплату</span>
    </div>
  );
};

export default Payers;
