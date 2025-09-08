import { Stack } from 'expo-router';

import HomePage from '@/templates/HomePage';

const Home = () => (
  <>
    <Stack.Screen
      options={{
        headerShown: false,
      }}
    />
    <HomePage />
  </>
);

export default Home;
