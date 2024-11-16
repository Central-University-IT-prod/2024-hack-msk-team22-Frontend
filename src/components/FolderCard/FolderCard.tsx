import Image from 'next/image';
import styles from './FolderCard.module.css';

interface FolderCardProps {
    _id: string;
    image: string;
    name: string;
    billAmount: number;
    eventsCount: number;
    remainsBill: number;
}

export default function FolderCard(props: FolderCardProps): JSX.Element {
    return (
        <div className={styles.card} style={{cursor: props.eventsCount > 0? "pointer" : "default"}} onClick={props.eventsCount > 0? () => window.location.href = "/events/" + props._id : undefined }>
            <div className={styles.imageContainer}>
                <Image
                    src={props.image}
                    alt="EventImage"
                    layout="responsive"
                    width={500}
                    height={500}
                    className={styles.eventImage}
                />
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.header}>
                    <span className={styles.folderName}>{props.name}</span>
                    <div className={styles.totalBill}>
                        <span className={styles.billText}>Итоговая сумма:</span>
                        <span className={styles.billAmount}>{props.billAmount} ₽</span>
                    </div>
                </div>
                <div className={styles.splitSection}>
                    <div className={styles.eventsCount}>
                        <span className={styles.billText}>Всего сплитов:</span>
                        <span className={styles.billAmount}>{props.eventsCount}</span>
                    </div>
                    <div className={styles.totalBill}>
                        <span className={styles.billText}>Осталось:</span>
                        <span className={styles.billAmount}>{props.remainsBill} ₽</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
