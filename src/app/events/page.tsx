"use client";
import Header from "@/components/Header/Header";
import styles from "./events.module.css";
import { useEffect, useState } from "react";
import FolderCard from "@/components/FolderCard/FolderCard";
import CreateEventModal from "@/components/CreateEventModal/CreateEventModal";
import CreateSplitModal from "@/components/CreateSplitModal/CreateSplitModal";
import AxiosInstance from "@/api/instance";

export default function EventsPage() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

  // Функция для перезагрузки списка мероприятий
  const fetchEvents = () => {
    setLoading(true);
    AxiosInstance.get('/event')
      .then(response => {
        setEvents(response.data.events as EventResponse[]);
        const fetchedCategories = response.data.events.map((event: EventResponse) => ({
          id: event._id,
          name: event.name,
        }));
        setCategories([{ id: null, name: "Без категории" }, ...fetchedCategories]);
        setLoading(false);
      })
      .catch(error => {
        if (error.status === 401) {
          window.location.href = "/";
        }
      });
  };

  useEffect(() => {
    fetchEvents();  // Загружаем события при первоначальной загрузке
  }, []);

  const [modalSplitIsOpen, setSplitModalIsOpen] = useState(false);
  const [modalEventIsOpen, setEventModalIsOpen] = useState(false);

  return (
    <div>
      <Header />
      {modalSplitIsOpen && (
        <CreateSplitModal
          setModalIsOpen={setSplitModalIsOpen}
          categories={categories}
          onEventCreated={fetchEvents} // Передаем функцию для обновления событий
        />
      )}
      {modalEventIsOpen && (
        <CreateEventModal
          setModalIsOpen={setEventModalIsOpen}
          setEvents={setEvents}
          events={events}
        />
      )}
      <div
        className={styles.container}
        style={{
          overflowX: modalSplitIsOpen || modalEventIsOpen ? "hidden" : "scroll",
          height: "100vh",
        }}
      >
        <div className={styles.payers}></div>
        <div>
          <h2>Твои мероприятия:</h2>
          <div className={styles.buttons}>
            <div className={styles.addButton} onClick={() => setEventModalIsOpen(true)}>
              Создать событие
            </div>
            <div className={styles.addButton} onClick={() => setSplitModalIsOpen(true)}>
              Создать сплит
            </div>
          </div>
        </div>
        <div className={styles.events}>
          {loading
            ? Array(5)
              .fill(0)
              .map((_, index) => <div key={index} className={styles.skeletonCard}></div>)
            : events.map((event, index) => (
              <FolderCard
                key={index}
                image={event.image_url}
                billAmount={event.price}
                name={event.name}
                eventsCount={event.count_splits}
                _id={event._id}
                remainsBill={event.remains_bill}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
