import React, {Dispatch, SetStateAction, useState} from 'react';
import styles from './CreateEventModal.module.css';
import AxiosInstance from "@/api/instance";

const CreateEventModal = ({setModalIsOpen, setEvents, events}: {setModalIsOpen: Dispatch<SetStateAction<boolean>>, setEvents: Dispatch<SetStateAction<EventResponse[]>>, events: EventResponse[]}) => {
  const [title, setTitle] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleSubmit = () => {
    AxiosInstance.post('/event', {
      name: title,
      image_url: imageUrl,
    })
      .then(response => {
        setEvents([...events, {
          _id: response.data._id,
          creator: response.data.creator,
          name: response.data.name,
          image_url: response.data.image_url,
          remains_bill: 0,
          count_splits: 0,
          price: 0,

        } as EventResponse]);
        setModalIsOpen(false);
      })
  };

  return (
    <div className={styles.modal}>
      <h2>Создать событие <button className={styles.closeButton} onClick={() => setModalIsOpen(false)}>✕</button></h2>
      <div>
        <label className={styles.input}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Название события"
          />
        </label>
      </div>
      <div>
        <label className={styles.input}>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Ссылка на картинку"
          />
        </label>
      </div>

      <button className={styles.button} onClick={handleSubmit}>Создать событие</button>
    </div>
  );
};

export default CreateEventModal;
