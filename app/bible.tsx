import { Stack } from 'expo-router';

import BibleReadingPage from '@/templates/BibleReadingPage';

const Bible = () => (
  <>
    <Stack.Screen
      options={{
        headerShown: false,
        // Slide the Bible view in from left to right
        animation: 'slide_from_left',
      }}
    />
    <BibleReadingPage />
  </>
);

export default Bible;
