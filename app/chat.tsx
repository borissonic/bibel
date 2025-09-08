import { Stack } from 'expo-router';

import ChatPage from '@/templates/ChatPage';

const Chat = () => (
  <>
    <Stack.Screen options={{ headerShown: false }} />
    <ChatPage />
  </>
);

export default Chat;
