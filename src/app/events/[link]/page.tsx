"use client"
import Header from "@/components/Header/Header";
import {use, useEffect, useState} from "react";
import AxiosInstance from "@/api/instance";
import Image from "next/image";
import styles from './page.module.css'
import Payers, {PayersData} from "@/components/Payers/Payers";
import EventCard from "@/components/EventCard/EventCard";

const EventPage = ({ params }: { params: Promise<{ link: string }> }) => {
  const { link } = use(params);

  const [event, setEvent] = useState<EventResponse>();
  const [splits, setSplits] = useState<SplitResponse[]>([]);
  const [debtors, setDebtors] = useState<PayersData>({})

  useEffect(() => {
    AxiosInstance.get('/event/'+link)
      .then(response => {
        const debts = response.data.debtors as PayersData
        const newDebts = {} as PayersData
        for (let creditor in debts) {
          newDebts[creditor] = {};
          for (let debtor in debts[creditor]) {
            if (debts[creditor][debtor] > 0) {
              newDebts[creditor][debtor] = debts[creditor][debtor];
            }
          }
        }

        setEvent(response.data.event as EventResponse);
        setDebtors(newDebts);
      })
      .catch(error => {
        if (error.status === 401) {
          window.location.href = "/"
        }
      });

    AxiosInstance.get('/event/'+link + '/splits')
      .then(response => {
        setSplits(response.data as SplitResponse[]);
      })
      .catch(error => {
        if (error.status === 401) {
          window.location.href = "/"
        }
      });
  }, []);


  return (
    <div>
      <Header />
      {event && (
        <div className={styles.event}>
          <div className={styles.name}>
            <Image className={styles.eventImage} src={event.image_url} alt="Event image" width={50} height={50}/>
            <span>{event.name}</span>
          </div>
          <div className={styles.payers}>
            <Payers titleText="Должники" payments={debtors} eventID={event._id} />
          </div>
          <span className={styles.title}>Сплиты:</span>
          <div className={styles.splits}>
            {splits.map((split, i) => (
              <EventCard
                key={i}
                billAmount={split.price}
                name={split.name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default EventPage;