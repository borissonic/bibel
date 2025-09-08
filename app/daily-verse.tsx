import { Stack } from 'expo-router';

import DailyVerseFullScreen from '@/templates/DailyVerseFullScreen';

const DailyVerse = () => (
  <>
    <Stack.Screen options={{ headerShown: false }} />
    <DailyVerseFullScreen />
  </>
);

export default DailyVerse;
