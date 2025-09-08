import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import type React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedBackground } from '@/components/AnimatedBackground';

type Msg = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  text: string;
};

const createId = () => Math.random().toString(36).slice(2);

const ChatPage: React.FC = () => {
  const params = useLocalSearchParams();
  const initialPrompt = useMemo(() => {
    const q = (params.q as string) || (params.prompt as string) || '';
    return q;
  }, [params]);

  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const [currentAssistantId, setCurrentAssistantId] = useState<string | null>(
    null,
  );

  const scrollToEnd = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    });
  }, []);

  const generateReply = (prompt: string) => {
    const lower = prompt.toLowerCase();
    if (lower.startsWith('help me interpret this verse')) {
      return (
        'Here is a gentle interpretation and reflection:\n' +
        '- Context: Consider the surrounding passage and audience.\n' +
        '- Key theme: God’s faithfulness and invitation to trust.\n' +
        '- Application: A practical step you can take today.\n' +
        'Would you like a prayer based on this verse?'
      );
    }
    if (lower.startsWith('tell me more about')) {
      const topic = prompt.replace(/tell me more about\s*/i, '');
      return (
        `Here’s a quick overview of ${topic}:\n` +
        '- Why it matters\n' +
        '- Foundational verses\n' +
        '- A simple next step you can try today\n' +
        'Want a 7‑day plan on this topic?'
      );
    }
    return (
      'Thanks for your question. Here are a few helpful thoughts:\n' +
      '1) A summary grounded in Scripture\n' +
      '2) Practical advice for daily life\n' +
      '3) A short encouragement to close\n' +
      'Would you like resources to go deeper?'
    );
  };

  const streamAssistant = async (prompt: string) => {
    if (isStreaming) return;
    setIsStreaming(true);
    const reply = generateReply(prompt);
    const id = createId();
    setCurrentAssistantId(id);
    setMessages((m) => [...m, { id, role: 'assistant', text: '' }]);
    scrollToEnd();

    // Simulated streaming without await-in-loop
    await new Promise<void>((resolve) => {
      const chars = Array.from(reply);
      let i = 0;
      const timer = setInterval(() => {
        const slice = chars.slice(i, i + 3).join('');
        i += 3;
        setMessages((m) =>
          m.map((msg) =>
            msg.id === id ? { ...msg, text: msg.text + slice } : msg,
          ),
        );
        scrollToEnd();
        if (i >= chars.length) {
          clearInterval(timer);
          resolve();
        }
      }, 20);
    });
    setIsStreaming(false);
    setCurrentAssistantId(null);
  };

  useEffect(() => {
    if (initialPrompt) {
      setMessages((m) => [
        ...m,
        { id: createId(), role: 'user', text: initialPrompt },
      ]);
      setInput('');
      streamAssistant(initialPrompt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt]);

  const onSend = () => {
    const value = input.trim();
    if (!value || isStreaming) return;
    setMessages((m) => [...m, { id: createId(), role: 'user', text: value }]);
    setInput('');
    scrollToEnd();
    streamAssistant(value);
  };

  // Determine if assistant text has started streaming yet
  const currentAssistantText = useMemo(() => {
    if (!currentAssistantId) return '';
    const msg = messages.find((m) => m.id === currentAssistantId);
    return msg?.text ?? '';
  }, [currentAssistantId, messages]);

  return (
    <View style={{ flex: 1 }}>
      <AnimatedBackground />
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
            paddingVertical: 8,
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            accessibilityRole="button"
            style={{ padding: 8, width: 38 }}
          >
            <Ionicons name="chevron-back" size={22} color="#000" />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons
              name="sparkles-outline"
              size={18}
              color="#000"
              style={{ marginRight: 6 }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                color: '#000',
                fontFamily: 'LibreCaslonText',
              }}
            >
              Ask AI
            </Text>
          </View>
          <View style={{ width: 38 }} />
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollRef}
          style={{ flex: 1, paddingHorizontal: 14 }}
          contentContainerStyle={{ paddingBottom: 140 }}
          onContentSizeChange={scrollToEnd}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((m) => {
            const isUser = m.role === 'user';
            return (
              <View
                key={m.id}
                style={{
                  paddingVertical: 6,
                  flexDirection: 'row',
                  justifyContent: isUser ? 'flex-end' : 'flex-start',
                }}
              >
                <View
                  style={{
                    maxWidth: '85%',
                    backgroundColor: isUser ? '#000' : '#FFFFFF',
                    borderWidth: isUser ? 0 : 1,
                    borderColor: 'rgba(0,0,0,0.1)',
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    borderRadius: 16,
                  }}
                >
                  <Text
                    style={{
                      color: isUser ? '#FFFFFF' : '#000000',
                      fontSize: 15,
                      lineHeight: 21,
                      fontFamily: 'LibreCaslonText',
                    }}
                  >
                    {m.text}
                  </Text>
                </View>
              </View>
            );
          })}

          {isStreaming && !currentAssistantText && (
            <View
              style={{
                paddingVertical: 6,
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: '#FFFFFF',
                  borderWidth: 1,
                  borderColor: 'rgba(0,0,0,0.1)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ActivityIndicator color="#000" />
              </View>
            </View>
          )}
        </ScrollView>

        {/* Composer - same as Home pill input */}
        <KeyboardAvoidingView
          behavior={Platform.select({ ios: 'padding', android: undefined })}
        >
          <View
            style={{ position: 'absolute', bottom: 12, left: 20, right: 20 }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                borderRadius: 28,
                paddingLeft: 20,
                paddingRight: 4,
                paddingVertical: 4,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.12,
                shadowRadius: 16,
                elevation: 5,
              }}
            >
              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Ask me anything..."
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
                onSubmitEditing={onSend}
                style={{
                  flex: 1,
                  paddingVertical: 10,
                  fontSize: 14,
                  color: '#000000',
                  fontFamily: 'LibreCaslonText',
                }}
                editable={!isStreaming}
              />
              <TouchableOpacity
                onPress={onSend}
                disabled={isStreaming}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: '#000000',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: isStreaming ? 0.6 : 1,
                }}
                accessibilityRole="button"
              >
                <Ionicons name="send" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default ChatPage;
