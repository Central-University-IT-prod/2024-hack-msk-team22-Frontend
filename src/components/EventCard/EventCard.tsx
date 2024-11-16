import Image from 'next/image';
import styles from './EventCard.module.css';

interface EventCardProps {
    name: string;
    billAmount: number;
}

export default function EventCard(props: EventCardProps): JSX.Element {
    return (
        <div className={styles.card}>
            <span className={styles.eventName}>{props.name}</span>
            <div className={styles.infoContainer}>
                <div className={styles.header}>
                    <div className={styles.totalBill}>
                        <span className={styles.billText}>Итоговая сумма:</span>
                        <span className={styles.billAmount}>{props.billAmount} ₽</span>
                    </div>
                </div>
                <div className={styles.splitSection}>
                    <span>Разделено с:</span>
                    <div className={styles.avatars}>
                        <Image src="/user.webp" alt="User 1" width={40} height={40} className={styles.avatar} />
                        <Image src="/user.webp" alt="User 2" width={40} height={40} className={styles.avatar} />
                        <Image src="/user.webp" alt="User 3" width={40} height={40} className={styles.avatar} />
                    </div>
                </div>
            </div>
        </div>
    );
}
