interface PaymentDetails {
  amount: number;
  paid: boolean;
}

interface SplitResponse {
  _id: string;                // Идентификатор записи
  event: string;              // Идентификатор события
  icon: string;               // Путь к иконке категории
  members: { [name: string]: PaymentDetails }; // Список участников с их деталями по оплате
  name: string;               // Название мероприятия/события
  payer: string;              // Идентификатор плательщика
  price: number;              // Цена
}
