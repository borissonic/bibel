import { Stack } from 'expo-router';

import LivePrayerPage from '@/templates/LivePrayerPage';

const LivePrayer = () => (
  <>
    <Stack.Screen
      options={{
        headerShown: false,
      }}
    />
    <LivePrayerPage />
  </>
);

export default LivePrayer;
