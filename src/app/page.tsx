"use client";
import styles from './page.module.css';
import LoginButton from "@/components/LoginButton/LoginButton";
import {useState} from "react";
import RegisterButton from "@/components/RegisterButton/RegisterButton";
import Header from "@/components/Header/Header";

export default function Home() {

  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div>
      <Header/>
      <div className={styles.container}>
        <main className={styles.main}>
          <section className={styles.hero}>
            <h2 className={styles.text_margin}>Легко разделяйте платежи между друзьями</h2>
            <p className={styles.text_margin}>С Splitter вы забудете о сложных расчетах и неудобствах при делении
              счетов.</p>

            {isLogin ? <LoginButton setIsLogin={setIsLogin}/> : <RegisterButton setIsLogin={setIsLogin}/>}
          </section>

          <section className={styles.features}>
            <h3>Наши функции</h3>
            <div className={styles.feature}>
              <h4>Простота использования</h4>
              <p>Понятный интерфейс для быстрого деления счетов.</p>
            </div>
            <div className={styles.feature}>
              <h4>Поддержка всех валют</h4>
              <p>Делите счета, где бы вы ни находились, с поддержкой всех мировых валют.</p>
            </div>
            <div className={styles.feature}>
              <h4>История платежей</h4>
              <p>Ведите учет всех прошлых платежей, чтобы ничего не забыть.</p>
            </div>
            <div className={styles.feature}>
              <h4>Персонализированные отчеты</h4>
              <p>Получайте детализированные отчеты о всех разделенных расходах.</p>
            </div>
            <div className={styles.feature}>
              <h4>Группы</h4>
              <p>Создавайте группы для поездок или мероприятий, чтобы еще проще делить расходы.</p>
            </div>
          </section>

          <section className={styles.testimonials}>
            <h3>Что говорят пользователи</h3>
            <blockquote>
              <p>Splitter изменил мою жизнь! Больше никаких споров о деньгах.</p>
              <cite>— Аня, Москва</cite>
            </blockquote>
            <blockquote>
              <p>Идеальн о для поездок с друзьями. Просто и удобно.</p>
              <cite>— Сергей, Санкт-Петербург</cite>
            </blockquote>
            <blockquote>
              <p>Очень удобно для совместных покупок и вечеринок.</p>
              <cite>— Кира, Новосибирск</cite>
            </blockquote>
          </section>
        </main>
      </div>
    </div>
  );
}
