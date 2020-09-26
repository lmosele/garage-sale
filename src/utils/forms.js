import { useState, useEffect } from "react";
/* eslint-disable */ 
export function usePasswordValidator(config = { min: 6, max: 10 }) {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    setPasswordError("");
    if (!password) return;

    if (password.length < config.min) {
      setPasswordError(`Password must be at least ${config.min} characters.`);
    } else if (password.length > config.max) {
      setPasswordError(`Password must be less than ${config.max} characters.`);
    }
  }, [password]);

  return [password, setPassword, passwordError];
}

export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
