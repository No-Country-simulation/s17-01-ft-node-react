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

    if (form.email && !validateEmail(form.email)) {
      setError({ ...error, email: "Ingrese un email válido" });
    } else {
      setError({ ...error, email: "" });
    }

    if (form.password && form.password.length < 8) {
      setError({ ...error, password: "La contraseña debe tener al menos 8 caracteres" });
    } else {
      setError({ ...error, password: "" });
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

