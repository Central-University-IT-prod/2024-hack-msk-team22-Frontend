"use client";
import styles from './RegisterButton.module.css';
import AxiosInstance from "@/api/instance";
import {Dispatch, SetStateAction, useState} from "react";

const RegisterButton = ({setIsLogin}: {setIsLogin: Dispatch<SetStateAction<boolean>>}) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const onRegister = () => {
    AxiosInstance.post('/register', {
      username: username,
      password: password,
    })
      .then(response => {
        const accessToken = response.data.access_token;
        localStorage.setItem("token", accessToken);
        window.location.href = "/events"
      })
      .catch(error => {
        if (error.response) {
          setError(error.response.data);
        }
      })
  }

  return (
    <div>
      <div className={styles.inRow}>
        <div className={styles.input1}>
          <label htmlFor="username">Логин:</label>
          <input onChange={(e) => setUsername(e.target.value)} type="text" id="username" name="username" required/>
        </div>

        <div className={styles.input2}>
          <label htmlFor="password">Пароль:</label>
          <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" required/>
        </div>
      </div>

      <div className={styles.buttons}>
        {error}
        <div className={styles.loginButton} onClick={onRegister}>Зарегистрироваться</div>
        <p>Или</p>
        <span onClick={(_) => setIsLogin(true)}>Войти</span>
      </div>
    </div>
  )
}


export default RegisterButton;