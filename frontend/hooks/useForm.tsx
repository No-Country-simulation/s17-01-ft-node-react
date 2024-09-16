import { useEffect, useState } from "react";


export function useForm() {
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [missing, setMissing] = useState<{ email: boolean; password: boolean }>({
    email: false,
    password: false,
  });

  const { short, uppercase, specialCharacter, number } = validatePassword(form.password);

  useEffect(() => {

    if (form.email) {
      if (!validateEmail(form.email)) {
        setError((prevError) => ({
          ...prevError,
          email: "Ingrese un email válido",
        }));
      } else {
        setError((prevError) => ({
          ...prevError,
          email: "",
        }));
      }
    }

    if (form.password) {

      if (short) {
        setError((prevError) => ({
          ...prevError,
          password: "La contraseña debe tener al menos 8 caracteres",
        }));
      } else if (uppercase) {
        setError((prevError) => ({
          ...prevError,
          password: "La contraseña debe tener al menos una letra mayúscula",
        }));
      } else if (specialCharacter) {
        setError((prevError) => ({
          ...prevError,
          password: "La contraseña debe tener al menos un carácter especial",
        }));
      } else if (number) {
        setError((prevError) => ({
          ...prevError,
          password: "La contraseña debe tener al menos un número",
        }));
      } else {
        setError((prevError) => ({
          ...prevError,
          password: "",
        }));
      }
    }
  }, [form.email, form.password]);

  return { form, setForm, error, setError, missing, setMissing };
}

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string) => {
  const validate = {
    short: password.length < 8,
    uppercase: password.match(/[A-Z]/) === null,
    specialCharacter: password.match(/[!@#$%^&*.\-]/) === null,
    number: password.match(/[0-9]/) === null,
  };
  return validate;
}

