import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, TextInput, PasswordInput, Paper } from '@mantine/core';
import { Lock } from 'lucide-react';
import { login } from '../lib/authService';
import styles from './AdminLogin.module.css';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const onSubmit = async ({ email, password }) => {
    setError('');
    await new Promise((r) => setTimeout(r, 400));
    if (login(email, password)) {
      navigate('/admin');
    } else {
      setError('E-mail ou senha incorretos.');
    }
  };

  return (
    <div className={styles.wrap}>
      <Paper className={styles.paper} radius="lg" p="xl">
        <div className={styles.iconWrap}><Lock size={22} /></div>
        <h1 className={styles.title}>Painel Administrativo</h1>
        <p className={styles.subtitle}>Geleia Barber Club</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput label="E-mail" {...register('email', { required: true })} />
          <PasswordInput label="Senha" mt="md" {...register('password', { required: true })} />
          {error && <p className={styles.error}>{error}</p>}
          <Button type="submit" fullWidth mt="lg" radius="xl" color="red" loading={isSubmitting}>
            Entrar
          </Button>
        </form>
      </Paper>
    </div>
  );
}
