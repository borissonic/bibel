import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type React from 'react';
import { useMemo, useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Verse = {
  number: number;
  text: string;
};

// Minimal sample data. In the future, replace with real Bible data.
const SAMPLE_CHAPTER: Verse[] = [
  {
    number: 1,
    text: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
  },
  {
    number: 2,
    text: 'He was with God in the beginning.',
  },
  {
    number: 3,
    text: 'Through him all things were made; without him nothing was made that has been made.',
  },
  {
    number: 4,
    text: 'In him was life, and that life was the light of all mankind.',
  },
  {
    number: 5,
    text: 'The light shines in the darkness, and the darkness has not overcome it.',
  },
];

const BOOKS = [
  'Genesis',
  'Exodus',
  'Psalms',
  'Proverbs',
  'Matthew',
  'Mark',
  'Luke',
  'John',
  'Acts',
  'Romans',
  '1 Corinthians',
  '2 Corinthians',
  'Galatians',
  'Ephesians',
  'Philippians',
  'Colossians',
  '1 Thessalonians',
  '2 Thessalonians',
  '1 Timothy',
  '2 Timothy',
  'Titus',
  'Philemon',
  'Hebrews',
  'James',
  '1 Peter',
  '2 Peter',
  '1 John',
  '2 John',
  '3 John',
  'Jude',
  'Revelation',
];

const BibleReadingPage: React.FC = () => {
  const [fontSize, setFontSize] = useState(16);
  const [selectedBook, setSelectedBook] = useState('John');
  const [chapter] = useState(1);
  const [openBookModal, setOpenBookModal] = useState(false);
  const [activeVerse, setActiveVerse] = useState<number | null>(null);

  const verses = useMemo(() => SAMPLE_CHAPTER, []);

  const onShareVerse = async (verse: Verse) => {
    try {
      await Share.share({
        message: `${selectedBook} ${chapter}:${verse.number} — ${verse.text}`,
      });
    } catch (e) {
      // no-op
    }
  };

  const onInterpretVerse = (verse: Verse) => {
    const prompt = `Help me interpret this verse: ${selectedBook} ${chapter}:${verse.number} — ${verse.text}`;
    router.push({ pathname: '/chat', params: { q: prompt } });
  };

  const onBookmarkVerse = (verse: Verse) => {
    Alert.alert(
      'Bookmarked',
      `${selectedBook} ${chapter}:${verse.number} saved.`,
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Top bar */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ padding: 8, marginRight: 8 }}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons name="chevron-back" size={24} color="#000000" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setOpenBookModal(true)}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 8,
            }}
            accessibilityRole="button"
            accessibilityLabel="Select book"
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: '#000000',
                fontFamily: 'LibreCaslonText',
              }}
            >
              {selectedBook} {chapter}
            </Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => setFontSize((s) => Math.max(12, s - 2))}
              style={{ padding: 8, marginRight: 4 }}
              accessibilityRole="button"
              accessibilityLabel="Decrease text size"
            >
              <Text style={{ fontSize: 16, color: '#000000' }}>A-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setFontSize((s) => Math.min(28, s + 2))}
              style={{ padding: 8, marginLeft: 4 }}
              accessibilityRole="button"
              accessibilityLabel="Increase text size"
            >
              <Text style={{ fontSize: 18, color: '#000000' }}>A+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {verses.map((v) => {
            const isActive = activeVerse === v.number;
            return (
              <View key={v.number} style={{ marginBottom: 10 }}>
                <TouchableOpacity
                  onPress={() => setActiveVerse(isActive ? null : v.number)}
                  style={{ flexDirection: 'row', alignItems: 'flex-start' }}
                  accessibilityRole="button"
                  accessibilityLabel={`Verse ${v.number}`}
                >
                  <Text
                    style={{
                      fontSize: fontSize * 0.8,
                      color: '#666',
                      width: 28,
                      textAlign: 'right',
                      marginRight: 8,
                      fontFamily: 'LibreCaslonText',
                    }}
                  >
                    {v.number}
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      fontSize,
                      color: '#000',
                      lineHeight: fontSize * 1.6,
                      fontFamily: 'LibreCaslonText',
                    }}
                  >
                    {v.text}
                  </Text>
                </TouchableOpacity>

                {isActive && (
                  <View
                    style={{
                      marginTop: 8,
                      marginLeft: 36,
                      backgroundColor: 'rgba(0,0,0,0.05)',
                      borderRadius: 12,
                      padding: 8,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => onInterpretVerse(v)}
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 8,
                        paddingHorizontal: 10,
                        marginRight: 6,
                        backgroundColor: '#FFFFFF',
                        borderRadius: 10,
                      }}
                    >
                      <Ionicons
                        name="sparkles-outline"
                        size={16}
                        color="#000"
                      />
                      <Text
                        numberOfLines={1}
                        style={{
                          marginLeft: 6,
                          color: '#000',
                          fontFamily: 'LibreCaslonText',
                          fontSize: 11,
                          flexShrink: 1,
                        }}
                      >
                        Ask AI
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => onBookmarkVerse(v)}
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 8,
                        paddingHorizontal: 10,
                        marginHorizontal: 6,
                        backgroundColor: '#FFFFFF',
                        borderRadius: 10,
                      }}
                    >
                      <Ionicons
                        name="bookmark-outline"
                        size={16}
                        color="#000"
                      />
                      <Text
                        numberOfLines={1}
                        style={{
                          marginLeft: 6,
                          color: '#000',
                          fontFamily: 'LibreCaslonText',
                          fontSize: 11,
                          flexShrink: 1,
                        }}
                      >
                        Bookmark
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => onShareVerse(v)}
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 8,
                        paddingHorizontal: 10,
                        marginLeft: 6,
                        backgroundColor: '#FFFFFF',
                        borderRadius: 10,
                      }}
                    >
                      <Ionicons name="share-outline" size={16} color="#000" />
                      <Text
                        numberOfLines={1}
                        style={{
                          marginLeft: 6,
                          color: '#000',
                          fontFamily: 'LibreCaslonText',
                          fontSize: 11,
                          flexShrink: 1,
                        }}
                      >
                        Share
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>

      {/* Book picker modal */}
      <Modal visible={openBookModal} animationType="slide" transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              maxHeight: '60%',
              paddingBottom: 12,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: 'rgba(0,0,0,0.08)',
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  fontFamily: 'LibreCaslonText',
                }}
              >
                Select Book
              </Text>
              <TouchableOpacity
                onPress={() => setOpenBookModal(false)}
                style={{ padding: 6 }}
              >
                <Ionicons name="close" size={20} color="#000" />
              </TouchableOpacity>
            </View>
            <ScrollView
              contentContainerStyle={{
                paddingHorizontal: 12,
                paddingBottom: 24,
              }}
              showsVerticalScrollIndicator={false}
            >
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {BOOKS.map((b) => (
                  <TouchableOpacity
                    key={b}
                    onPress={() => {
                      setSelectedBook(b);
                      setOpenBookModal(false);
                    }}
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 12,
                      borderRadius: 12,
                      backgroundColor:
                        b === selectedBook ? '#FFD700' : 'rgba(0,0,0,0.05)',
                      margin: 6,
                    }}
                  >
                    <Text
                      style={{ fontSize: 14, fontFamily: 'LibreCaslonText' }}
                    >
                      {b}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BibleReadingPage;
