import { TextInput, Button, Group, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const SignUp = () => {
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

  const signUp = async ({ email, password }) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  return (
    <form onSubmit={form.onSubmit(signUp)}>
      <Title order={2}>Sign up</Title>
      <TextInput mt="md" withAsterisk label="Email" placeholder="your@email.com" {...form.getInputProps('email')} />
      <TextInput mt="md" withAsterisk label="Password" placeholder="password" {...form.getInputProps('password')} />

      <Group position="center" mt="xl">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
};
