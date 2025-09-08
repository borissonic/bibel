import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Directions,
  FlingGestureHandler,
  GestureHandlerRootView,
  State,
} from 'react-native-gesture-handler';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { AnimatedBackground } from '@/components/AnimatedBackground';
import PrayIcon from '@/components/PrayIcon';

const { width } = Dimensions.get('window');

const HomePage = () => {
  const [selectedDay, setSelectedDay] = useState(0);
  const insets = useSafeAreaInsets();
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const topics = [
    {
      id: 1,
      title: 'Finding\nGod',
      image:
        'https://images.unsplash.com/photo-1492176273113-2d51f47b23b0?w=400&h=400&fit=crop',
    },
    {
      id: 2,
      title: 'Spiritual\nGrowth',
      image:
        'https://images.unsplash.com/photo-1470859624578-4bb57890378a?w=400&h=400&fit=crop',
    },
    {
      id: 3,
      title: 'Prayer &\nMeditation',
      image:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    },
    {
      id: 4,
      title: 'Bible\nStudy',
      image:
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop',
    },
    {
      id: 5,
      title: 'Faith &\nCommunity',
      image:
        'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop',
    },
    {
      id: 6,
      title: 'Hope &\nHealing',
      image:
        'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?w=400&h=400&fit=crop',
    },
  ];

  const [askValue, setAskValue] = useState('');

  return (
    <View style={{ flex: 1 }}>
      <AnimatedBackground />

      {/* Top-left Bible entry icon (separate from logo) */}
      <TouchableOpacity
        onPress={() => router.push('/bible')}
        style={{
          position: 'absolute',
          top: insets.top + 8,
          left: 16,
          zIndex: 10,
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 6,
          elevation: 3,
        }}
        accessibilityRole="button"
        accessibilityLabel="Open Bible"
      >
        <Ionicons name="book-outline" size={20} color="#000000" />
      </TouchableOpacity>

      {/* Top-right Settings icon */}
      <TouchableOpacity
        onPress={() => router.push('/settings')}
        style={{
          position: 'absolute',
          top: insets.top + 8,
          right: 16,
          zIndex: 10,
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 6,
          elevation: 3,
        }}
        accessibilityRole="button"
        accessibilityLabel="Open Settings"
      >
        <Ionicons name="settings-outline" size={18} color="#000000" />
      </TouchableOpacity>

      <SafeAreaView style={{ flex: 1 }}>
        <GestureHandlerRootView style={{ flex: 1, paddingHorizontal: 20 }}>
          {/* Header - Smaller, more refined */}
          <View style={{ paddingVertical: 12, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ marginRight: 8 }}>
                <PrayIcon size={24} color="#000000" />
              </View>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '600',
                  color: '#000000',
                  letterSpacing: -0.5,
                  fontFamily: 'LibreCaslonText',
                }}
              >
                Bible Pray
              </Text>
            </View>
          </View>

          <FlingGestureHandler
            direction={Directions.LEFT}
            onHandlerStateChange={(e) => {
              if (e.nativeEvent.state === State.END) {
                router.push('/bible');
              }
            }}
          >
            <ScrollView
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 80 }}
            >
              {/* Today's Journey - First, in a box */}
              <TouchableOpacity
                onPress={() => router.push('/streak')}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: 24,
                  padding: 20,
                  marginBottom: 16,
                  borderWidth: 1,
                  borderColor: 'rgba(128, 128, 128, 0.3)',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.08,
                  shadowRadius: 32,
                  elevation: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '600',
                      color: '#000000',
                      fontFamily: 'LibreCaslonText',
                    }}
                  >
                    Today&apos;s Journey
                  </Text>
                  <View
                    style={{
                      backgroundColor: '#000000',
                      borderRadius: 18,
                      paddingHorizontal: 14,
                      paddingVertical: 6,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Ionicons name="time" size={12} color="#FFFFFF" />
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 16,
                        fontWeight: '600',
                        marginLeft: 6,
                        fontFamily: 'LibreCaslonText',
                      }}
                    >
                      3
                    </Text>
                  </View>
                </View>

                <Text
                  style={{
                    fontSize: 12,
                    color: 'rgba(0, 0, 0, 0.6)',
                    marginBottom: 16,
                    fontFamily: 'LibreCaslonText',
                  }}
                >
                  1 day until Mount Ararat
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  {days.map((day, index) => {
                    const isSelected = selectedDay === index;
                    const uniqueKey = `day-${day}-${index}`;
                    return (
                      <TouchableOpacity
                        key={uniqueKey}
                        onPress={() => setSelectedDay(index)}
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 18,
                          backgroundColor: isSelected
                            ? '#FFD700'
                            : 'rgba(255, 255, 255, 0.6)',
                          borderWidth: 1,
                          borderColor: isSelected
                            ? '#FFD700'
                            : 'rgba(0, 0, 0, 0.2)',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: isSelected ? '600' : '500',
                            color: isSelected
                              ? '#000000'
                              : 'rgba(0, 0, 0, 0.6)',
                            fontFamily: 'LibreCaslonText',
                          }}
                        >
                          {day}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Review Button inside Today's Journey */}
                <TouchableOpacity
                  style={{
                    backgroundColor: '#000000',
                    borderRadius: 28,
                    paddingVertical: 14,
                    marginTop: 16,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.2,
                    shadowRadius: 20,
                    elevation: 3,
                  }}
                >
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 16,
                      fontWeight: '600',
                      textAlign: 'center',
                      fontFamily: 'LibreCaslonText',
                    }}
                  >
                    Review
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>

              {/* Today's Topics - Second, horizontally scrollable */}
              <View style={{ marginBottom: 16 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '600',
                      color: '#000000',
                      fontFamily: 'LibreCaslonText',
                    }}
                  >
                    Today&apos;s Topics
                  </Text>
                  <TouchableOpacity
                    onPress={() => router.push('/live-prayer')}
                    style={{
                      backgroundColor: '#FFD700',
                      borderRadius: 16,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Ionicons name="radio" size={14} color="#000000" />
                    <Text
                      style={{
                        color: '#000000',
                        fontSize: 12,
                        fontWeight: '600',
                        marginLeft: 4,
                        fontFamily: 'LibreCaslonText',
                      }}
                    >
                      Live Prayer
                    </Text>
                  </TouchableOpacity>
                </View>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingRight: 20 }}
                >
                  {topics.map((topic) => (
                    <TouchableOpacity
                      key={topic.id}
                      onPress={() => {
                        const label = topic.title.replace(/\n/g, ' ');
                        router.push({
                          pathname: '/chat',
                          params: { q: `Tell me more about ${label}` },
                        });
                      }}
                      style={{
                        width: (width - 60) * 0.42,
                        height: 120,
                        borderRadius: 20,
                        overflow: 'hidden',
                        backgroundColor: '#000',
                        marginRight: 12,
                      }}
                    >
                      <Image
                        source={{ uri: topic.image }}
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                        }}
                      />
                      <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.8)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '50%',
                        }}
                      />
                      <View
                        style={{
                          position: 'absolute',
                          bottom: 12,
                          left: 12,
                        }}
                      >
                        <Text
                          style={{
                            color: '#FFFFFF',
                            fontSize: 14,
                            fontWeight: '600',
                            lineHeight: 18,
                            fontFamily: 'LibreCaslonText',
                          }}
                        >
                          {topic.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Daily Verse - Third, with background image */}
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() =>
                  router.push({
                    pathname: '/daily-verse',
                    params: {
                      text: '“Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God”',
                      ref: 'PHILIPPIANS 4:6',
                      img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=2400&fit=crop',
                    },
                  })
                }
                style={{
                  borderRadius: 24,
                  padding: 20,
                  paddingTop: 24,
                  marginBottom: 16,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.12,
                  shadowRadius: 24,
                  elevation: 5,
                  overflow: 'hidden',
                }}
              >
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.9)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                />
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 16,
                    fontWeight: '600',
                    marginBottom: 12,
                    fontFamily: 'LibreCaslonText',
                  }}
                >
                  Daily Verse
                </Text>
                <Text
                  style={{
                    color: 'rgba(255, 255, 255, 0.95)',
                    fontSize: 14,
                    lineHeight: 20,
                    marginBottom: 16,
                    fontFamily: 'LibreCaslonText',
                  }}
                >
                  &quot;Do not be anxious about anything, but in every
                  situation, by prayer and petition, with thanksgiving, present
                  your requests to God.&quot;
                </Text>

                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: 20,
                      paddingVertical: 10,
                      alignItems: 'center',
                      marginRight: 6,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <Ionicons name="book" size={16} color="#FFFFFF" />
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontSize: 14,
                          fontWeight: '500',
                          marginLeft: 6,
                          fontFamily: 'LibreCaslonText',
                        }}
                      >
                        Read
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: '/daily-verse',
                        params: {
                          text: '“Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God”',
                          ref: 'PHILIPPIANS 4:6',
                          img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=2400&fit=crop',
                        },
                      })
                    }
                    style={{
                      flex: 1,
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: 20,
                      paddingVertical: 10,
                      alignItems: 'center',
                      marginLeft: 6,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <Ionicons name="share" size={16} color="#FFFFFF" />
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontSize: 14,
                          fontWeight: '500',
                          marginLeft: 6,
                          fontFamily: 'LibreCaslonText',
                        }}
                      >
                        Share
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </FlingGestureHandler>

          {/* Bottom Input - Pill shape with integrated send button */}
          <View
            style={{
              position: 'absolute',
              bottom: 12,
              left: 20,
              right: 20,
            }}
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
                value={askValue}
                onChangeText={setAskValue}
                onSubmitEditing={() => {
                  const q = askValue.trim();
                  if (q) router.push({ pathname: '/chat', params: { q } });
                }}
                placeholder="Ask me anything..."
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
                style={{
                  flex: 1,
                  paddingVertical: 10,
                  fontSize: 14,
                  color: '#000000',
                  fontFamily: 'LibreCaslonText',
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  const q = askValue.trim();
                  if (q) router.push({ pathname: '/chat', params: { q } });
                }}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: '#000000',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name="send" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </GestureHandlerRootView>
      </SafeAreaView>
    </View>
  );
};

export default HomePage;
