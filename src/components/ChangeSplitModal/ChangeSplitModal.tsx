import React, {Dispatch, SetStateAction, useState} from 'react';
import styles from './ChangeSplitModal.module.css';
import Image from 'next/image';

// Типы данных для пользователя и иконок
type PaymentType = 'equal' | 'custom';
type User = { name: string, amount: number };

const ChangeSplitModal = ({setModalIsOpen}: {setModalIsOpen: Dispatch<SetStateAction<boolean>>}) => {
  const [title, setTitle] = useState<string>('');
  const [selectedIcon, setSelectedIcon] = useState<string>('');
  const [paymentType, setPaymentType] = useState<PaymentType>('equal');
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Константа с категориями
  const categories = [
    'Транспорт',
    'Еда',
    'Развлечения',
    'Проживание',
    'Прочее'
  ];

  const icons = [
    '/category_1.svg', '/category_2.svg', '/category_3.svg', '/category_4.svg', '/category_5.svg'
  ];

  const handleAddUser = () => {
    setUsers([...users, { name: '', amount: 0 }]);
  };

  const handleUserChange = (index: number, name: string, amount: number) => {
    const newUsers = [...users];
    newUsers[index] = { name, amount };
    setUsers(newUsers);
  };

  const handleSubmit = () => {
    console.log('Event Created:', { title, selectedIcon, selectedCategory, paymentType, totalAmount, users });
  };

  return (
    <div className={styles.modal}>
      <h2>Изменить сплит <button className={styles.closeButton} onClick={() => setModalIsOpen(false)}>✕</button></h2>
      <div>
        <label className={styles.input}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Название сплита"
          />
        </label>
      </div>

      <div className={styles.input}>
        <span>Выберите категорию:</span>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={styles.select} // Применяем новый стиль
        >
          <option value="" disabled>Выберите категорию</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className={styles.input}>
        <span>Выберите иконку:</span>
        <div className={styles.icon_selection}>
          {icons.map((icon, index) => (
            <Image
              key={index}
              src={icon}
              alt={`Icon ${index + 1}`}
              onClick={() => setSelectedIcon(icon)}
              style={{border: icon === selectedIcon ? '2px solid #0056b3' : 'none'}}
              width={30}
              height={30}
            />
          ))}
        </div>
      </div>

      <div className={styles.input}>
        <span>Выберите тип платежа:</span>
        <div className={styles.paymentsTypes}>
          <div onClick={() => setPaymentType('equal')}>Поровну</div>
          <div onClick={() => setPaymentType('custom')}>Вручную</div>
        </div>
      </div>
      <button className={styles.button} onClick={handleAddUser}>Добавить пользователя</button>
      {paymentType === 'equal' && (
        <div>
          <label className={styles.input}>
            <span>Общая сумма:</span>
            <input
              type="number"
              value={totalAmount === 0 ? 0 : totalAmount}
              onChange={(e) => setTotalAmount(Number(e.target.value))}
              placeholder="Введите общую сумму"
            />
          </label>
          {users && (
            <div className={styles.users}>
              {users.map((user, index) => (
                <div key={index}>
                  <label>
                    Пользователь {index + 1}
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) => handleUserChange(index, e.target.value, user.amount)}
                      placeholder="Имя"
                      className={styles.username}
                    />
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {paymentType === 'custom' && (
        <div className={styles.users}>
          {users.map((user, index) => (
            <div key={index}>
              <div>
                <label>
                  Пользователь {index + 1}
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => handleUserChange(index, e.target.value, user.amount)}
                    placeholder="Имя"
                    className={styles.username}
                  />
                </label>
              </div>
              <div>
                <label className={styles.user}>
                  Сумма
                  <input
                    type="number"
                    value={user.amount}
                    onChange={(e) => handleUserChange(index, user.name, Number(e.target.value))}
                    placeholder="Сумма"
                    className={styles.username}
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
      <button className={styles.button} onClick={handleSubmit}>Изменить сплит</button>
    </div>
  );
};

export default ChangeSplitModal;
