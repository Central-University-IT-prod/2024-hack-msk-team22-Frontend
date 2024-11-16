"use client";

import styles from './LoginButton.module.css'
import AxiosInstance from "@/api/instance";
import {Dispatch, SetStateAction, useState} from "react";

const LoginButton = ({setIsLogin}: {setIsLogin: Dispatch<SetStateAction<boolean>>}) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onLogin = () => {
    AxiosInstance.post('/log-in', {
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
        <div className={styles.loginButton} onClick={onLogin}>Войти</div>
        <p>Или</p>
        <span onClick={(_) => setIsLogin(false)}>Зарегистрироваться</span>
      </div>
    </div>
  )
}


export default LoginButton;