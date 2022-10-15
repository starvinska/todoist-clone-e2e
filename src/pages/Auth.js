import { TextInput, Button, Group, Title, Box, NavLink, useMantineTheme } from '@mantine/core';
import { useForm } from '@mantine/form';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { showNotification } from '@mantine/notifications';
import { Link, useNavigate } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

import { Header } from '../components/layout/Header';
import { useThemeMode } from '../hooks/useThemeMode/useThemeMode';
import { auth } from '../firebase';
import { useUser } from '../hooks/useUser/useUser';

export const Auth = ({ mode }) => {
  const { darkMode } = useThemeMode();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const theme = useMantineTheme();

  useEffect(() => {
    if (!!user) {
      navigate('/');
    }
  }, [navigate, user]);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (!!value ? null : 'Required field'),
    },
  });

  const signIn = async ({ email, password }) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      showNotification({
        color: 'red',
        title: 'Something went wrong',
        message: error.message,
      });
    }
    setLoading(false);
  };

  const signUp = async ({ email, password }) => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      form.reset();
      navigate('/sign-in');
    } catch (error) {
      showNotification({
        color: 'red',
        title: 'Something went wrong',
        message: error.message,
      });
    }
    setLoading(false);
  };

  return (
    <main className={darkMode ? 'darkmode' : undefined}>
      <Header />
      <Box
        sx={(theme) => ({
          maxWidth: 400,
          margin: `calc(44px + ${theme.spacing.xl}px) auto 0 auto`,
          background: theme.white,
          boxShadow: '0 0 15px rgba(0,0,0,0.1)',
          padding: theme.spacing.xl,
          borderRadius: theme.radius.sm,
        })}
      >
        <form onSubmit={form.onSubmit(mode === 'sign-in' ? signIn : signUp)}>
          <Title order={2}>Sign {mode === 'sign-in' ? 'in' : 'up'}</Title>
          <TextInput
            type="email"
            mt="md"
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
          />
          <TextInput
            type="password"
            mt="md"
            withAsterisk
            label="Password"
            placeholder="password"
            {...form.getInputProps('password')}
          />

          <Group position="center" mt="xl">
            <Button loading={isLoading} type="submit">
              Submit
            </Button>
          </Group>
          <NavLink
            mt={20}
            icon={<FaExclamationTriangle color={theme.colors.orange[5]} />}
            label={mode === 'sign-in' ? "Don't have an account? Sign up." : 'Already have an account? Sign in.'}
            component={Link}
            to={mode === 'sign-in' ? '/sign-up' : '/sign-in'}
          />
        </form>
      </Box>
    </main>
  );
};
