import { useState, useEffect } from "react";

export function useSignUpForm() {
  const [form, setForm] = useState<{
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [missing, setMissing] = useState<{
    username: boolean;
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
  }>({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [error, setError] = useState<{
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { short, uppercase, specialCharacter, number, match } = passwordMatches(
    form.password,
    form.confirmPassword,
  );
  useEffect(() => {
    if (!form.password)
      return setError({ ...error, password: "", confirmPassword: "" });
    if (!short && !uppercase && !specialCharacter && !number && match)
      return setError({ ...error, password: "", confirmPassword: "" });
    if (form.password && form.confirmPassword && match)
      return setError({
        ...error,
        confirmPassword: "Las contraseñas no coinciden",
      });
    if (form.password && short)
      return setError({
        ...error,
        password: "La contraseña debe tener al menos 8 caracteres",
      });
    if (form.password && uppercase)
      return setError({
        ...error,
        password: "La contraseña debe tener al menos una mayúscula",
      });
    if (form.password && specialCharacter)
      return setError({
        ...error,
        password: "La contraseña debe tener al menos un caracter especial",
      });
    if (form.password && number)
      return setError({
        ...error,
        password: "La contraseña debe tener al menos un número",
      });
    // if (form.password && form.confirmPassword && !match)
    //   return setError({
    //     ...error,
    //     password: "",
    //     confirmPassword: "Las contraseñas no coinciden",
    //   });
  }, [
    short,
    uppercase,
    specialCharacter,
    number,
    match,
    form.password,
    form.confirmPassword,
  ]);
  return { form, setForm, missing, setMissing, error, setError };
}

function passwordMatches(password: string, confirmPassword: string) {
  const matches = {
    short: password.length < 8,
    uppercase: password.match(/[A-Z]/g) === null,
    specialCharacter: password.match(/[!@#$%^&*.\-]/) === null,
    number: password.match(/[0-9]/g) === null,
    match: !password || !confirmPassword || password !== confirmPassword,
  };
  return matches;
}
