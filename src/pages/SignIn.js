import { TextInput, Button, Group, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../firebase';

export const SignIn = () => {
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
    await signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <form onSubmit={form.onSubmit(signIn)}>
      <Title order={2}>Sign in</Title>
      <TextInput mt="md" withAsterisk label="Email" placeholder="your@email.com" {...form.getInputProps('email')} />
      <TextInput mt="md" withAsterisk label="Password" placeholder="password" {...form.getInputProps('password')} />

      <Group position="center" mt="xl">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
};
