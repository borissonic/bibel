/* eslint-disable react/no-unescaped-entities */
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LivePrayerPage = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const pageScaleAnim = useRef(new Animated.Value(0)).current;
  const pageFadeAnim = useRef(new Animated.Value(0)).current;
  const modalTranslateYAnim = useRef(new Animated.Value(500)).current;
  const modalFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Page entrance animation - scale up from center
    Animated.parallel([
      Animated.timing(pageFadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(pageScaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [pageFadeAnim, pageScaleAnim]);

  useEffect(() => {
    if (showComments) {
      // Slide up from bottom with fade in
      Animated.parallel([
        Animated.timing(modalTranslateYAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(modalFadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Slide down to bottom with fade out
      Animated.parallel([
        Animated.timing(modalTranslateYAnim, {
          toValue: 500,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(modalFadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showComments, modalTranslateYAnim, modalFadeAnim]);

  return (
    <View style={{ flex: 1 }}>
      {/* Background Image */}
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop',
        }}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
        resizeMode="cover"
      />

      {/* Dark Gradient Overlay */}
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
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

      <SafeAreaView style={{ flex: 1 }}>
        <Animated.View
          style={{
            flex: 1,
            opacity: pageFadeAnim,
            transform: [{ scale: pageScaleAnim }],
          }}
        >
          {/* Sticky Header */}
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 10,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 16,
              paddingTop: 20, // Account for status bar
            }}
          >
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator>
            {/* Spacer for sticky header */}
            <View style={{ height: 100 }} />

            {/* Main Content */}
            <View style={{ paddingHorizontal: 20, flex: 1 }}>
              {/* Event Title */}
              <View style={{ alignItems: 'flex-start', marginBottom: 20 }}>
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: '700',
                    color: '#FFFFFF',
                    lineHeight: 34,
                    fontFamily: 'LibreCaslonText',
                    marginBottom: 16,
                  }}
                >
                  🙏 The Biggest Praying Event
                </Text>
              </View>

              {/* Description */}
              <Text
                style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: 16,
                  lineHeight: 22,
                  marginBottom: 20,
                  fontFamily: 'LibreCaslonText',
                }}
              >
                🌍 Join millions around the world in one united moment of
                prayer.
              </Text>

              <Text
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: 14,
                  lineHeight: 20,
                  marginBottom: 20,
                  fontFamily: 'LibreCaslonText',
                }}
              >
                ✨ This week, we gather not just as a global community - but as
                one body in Christ - lifting our hearts in worship, surrender,
                and unwavering trust in God's promises. Wherever you are, your
                voice matters. 💫
              </Text>

              {/* Call to Action */}
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 14,
                  marginBottom: 8,
                  fontFamily: 'LibreCaslonText',
                }}
              >
                🕊️ God hears every prayer - but on this day, He hears us all at
                once.
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8,
                }}
              >
                <Text style={{ fontSize: 16, marginRight: 8 }}>❤️</Text>
                <Text
                  style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: 14,
                    fontFamily: 'LibreCaslonText',
                  }}
                >
                  Tap like to show your support.
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20,
                }}
              >
                <Text style={{ fontSize: 16, marginRight: 8 }}>💬</Text>
                <Text
                  style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: 14,
                    fontFamily: 'LibreCaslonText',
                  }}
                >
                  Share your thoughts in the comments to encourage others and
                  let them know they're not alone.
                </Text>
              </View>

              <Text
                style={{
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontSize: 14,
                  marginBottom: 30,
                  fontFamily: 'LibreCaslonText',
                }}
              >
                🤝 Let's fill this space with love and unity.
              </Text>

              {/* Prayer Text Section - Full Content */}
              <View
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  borderRadius: 16,
                  padding: 24,
                  marginBottom: 40,
                }}
              >
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 18,
                    lineHeight: 26,
                    fontFamily: 'LibreCaslonText',
                    textAlign: 'left',
                  }}
                >
                  Heavenly Father, we come together as one body in Christ,
                  united in prayer and worship. We lift our hearts to You,
                  surrendering our fears and doubts, and placing our trust in
                  Your infinite wisdom and love.
                  {'\n\n'}Lord, we acknowledge that You are the source of all
                  hope, peace, and strength. In times of uncertainty, You are
                  our anchor. In moments of joy, You are our celebration. In
                  seasons of sorrow, You are our comfort. We praise Your holy
                  name and thank You for the gift of salvation through Your Son,
                  Jesus Christ.
                  {'\n\n'}As we gather from every nation, tribe, and tongue, we
                  are reminded that Your love knows no boundaries. Whether we
                  speak different languages, come from different cultures, or
                  face different challenges, we are united by the blood of the
                  Lamb and the power of Your Spirit.
                  {'\n\n'}Father, we pray for healing - healing of our bodies,
                  our minds, our hearts, and our relationships. Touch those who
                  are suffering with illness, bring peace to those battling
                  anxiety and depression, and restore hope to those who feel
                  forgotten or alone.
                  {'\n\n'}We pray for our families, Lord. Strengthen marriages,
                  protect our children, and help us to love one another as You
                  have loved us. May our homes be filled with Your presence, and
                  may we be examples of Your grace to those around us.
                  {'\n\n'}We lift up our communities and nations before You.
                  Grant wisdom to our leaders, bring justice to the oppressed,
                  and help us to be peacemakers in a world filled with division.
                  May Your kingdom come and Your will be done on earth as it is
                  in heaven.
                  {'\n\n'}Lord, give us strength to face each day with courage
                  and faith. Help us to trust in Your promises even when we
                  cannot see the way forward. Remind us that You work all things
                  together for good for those who love You and are called
                  according to Your purpose.
                  {'\n\n'}We thank You for the privilege of coming before Your
                  throne of grace. We thank You for hearing our prayers, for
                  Your faithfulness through every season, and for the hope we
                  have in Christ Jesus. May this time of united prayer draw us
                  closer to You and to one another.
                  {'\n\n'}Fill us with Your love, Lord, that we might overflow
                  with compassion for others. Help us to be Your hands and feet
                  in this world, bringing light to dark places and hope to
                  hopeless situations. Use us as instruments of Your peace and
                  vessels of Your grace.
                  {'\n\n'}Guide our steps in the days ahead. Open doors that no
                  one can shut, and close doors that are not of You. Give us
                  discernment to know Your will and courage to follow where You
                  lead. May we walk in the fullness of Your Spirit and the power
                  of Your love.
                  {'\n\n'}In Jesus' precious and holy name, we pray together as
                  one voice, one heart, one family in Christ. Amen and Amen.
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Bottom Action Bar */}
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              paddingHorizontal: 20,
              paddingVertical: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            {/* User Count */}
            <TouchableOpacity style={{ alignItems: 'center' }}>
              <Ionicons name="people" size={20} color="#FFFFFF" />
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 12,
                  marginTop: 2,
                  fontFamily: 'LibreCaslonText',
                }}
              >
                1812
              </Text>
            </TouchableOpacity>

            {/* Likes */}
            <TouchableOpacity
              onPress={() => setIsLiked(!isLiked)}
              style={{ alignItems: 'center' }}
            >
              <Ionicons
                name={isLiked ? 'heart' : 'heart-outline'}
                size={20}
                color={isLiked ? '#FF4444' : '#FFFFFF'}
              />
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 12,
                  marginTop: 2,
                  fontFamily: 'LibreCaslonText',
                }}
              >
                3636
              </Text>
            </TouchableOpacity>

            {/* Comments */}
            <TouchableOpacity
              onPress={() => setShowComments(!showComments)}
              style={{ alignItems: 'center' }}
            >
              <Ionicons name="chatbubble-outline" size={20} color="#FFFFFF" />
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 12,
                  marginTop: 2,
                  fontFamily: 'LibreCaslonText',
                }}
              >
                232
              </Text>
            </TouchableOpacity>

            {/* Share */}
            <TouchableOpacity style={{ alignItems: 'center' }}>
              <Ionicons name="share-outline" size={20} color="#FFFFFF" />
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 12,
                  marginTop: 2,
                  fontFamily: 'LibreCaslonText',
                }}
              >
                Share
              </Text>
            </TouchableOpacity>
          </View>

          {/* Comments Modal/Overlay */}
          {showComments && (
            <Animated.View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '70%',
                backgroundColor: 'rgba(0, 0, 0, 0.95)',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                opacity: modalFadeAnim,
                transform: [{ translateY: modalTranslateYAnim }],
              }}
            >
              {/* Comments Header */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  paddingVertical: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: 'rgba(255, 255, 255, 0.1)',
                }}
              >
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 18,
                    fontWeight: '600',
                    fontFamily: 'LibreCaslonText',
                  }}
                >
                  💬 Live Comments
                </Text>
                <TouchableOpacity
                  onPress={() => setShowComments(false)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Ionicons name="close" size={18} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              {/* Comments List */}
              <ScrollView
                style={{ flex: 1, paddingHorizontal: 20 }}
                showsVerticalScrollIndicator
              >
                {/* Live Comment Items */}
                <View style={{ paddingVertical: 16 }}>
                  <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                    <View
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        backgroundColor: '#4CAF50',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 12,
                      }}
                    >
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontSize: 14,
                          fontWeight: '600',
                        }}
                      >
                        M
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginBottom: 4,
                        }}
                      >
                        <Text
                          style={{
                            color: '#FFFFFF',
                            fontSize: 14,
                            fontWeight: '600',
                            fontFamily: 'LibreCaslonText',
                          }}
                        >
                          Maria
                        </Text>
                        <Text
                          style={{
                            color: 'rgba(255, 255, 255, 0.5)',
                            fontSize: 12,
                            marginLeft: 8,
                            fontFamily: 'LibreCaslonText',
                          }}
                        >
                          2m ago
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontSize: 14,
                          lineHeight: 18,
                          fontFamily: 'LibreCaslonText',
                        }}
                      >
                        Thank you for this beautiful prayer 🙏 Feeling so
                        blessed to be part of this global family
                      </Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                    <View
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        backgroundColor: '#FF9800',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 12,
                      }}
                    >
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontSize: 14,
                          fontWeight: '600',
                        }}
                      >
                        D
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginBottom: 4,
                        }}
                      >
                        <Text
                          style={{
                            color: '#FFFFFF',
                            fontSize: 14,
                            fontWeight: '600',
                            fontFamily: 'LibreCaslonText',
                          }}
                        >
                          David
                        </Text>
                        <Text
                          style={{
                            color: 'rgba(255, 255, 255, 0.5)',
                            fontSize: 12,
                            marginLeft: 8,
                            fontFamily: 'LibreCaslonText',
                          }}
                        >
                          3m ago
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontSize: 14,
                          lineHeight: 18,
                          fontFamily: 'LibreCaslonText',
                        }}
                      >
                        Amen! Praying from Kenya 🇰🇪 God bless you all
                      </Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                    <View
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        backgroundColor: '#9C27B0',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 12,
                      }}
                    >
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontSize: 14,
                          fontWeight: '600',
                        }}
                      >
                        S
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginBottom: 4,
                        }}
                      >
                        <Text
                          style={{
                            color: '#FFFFFF',
                            fontSize: 14,
                            fontWeight: '600',
                            fontFamily: 'LibreCaslonText',
                          }}
                        >
                          Sarah
                        </Text>
                        <Text
                          style={{
                            color: 'rgba(255, 255, 255, 0.5)',
                            fontSize: 12,
                            marginLeft: 8,
                            fontFamily: 'LibreCaslonText',
                          }}
                        >
                          5m ago
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontSize: 14,
                          lineHeight: 18,
                          fontFamily: 'LibreCaslonText',
                        }}
                      >
                        Lord, I lift up my family to You. Thank you for this
                        moment of unity ✨
                      </Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                    <View
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        backgroundColor: '#2196F3',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 12,
                      }}
                    >
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontSize: 14,
                          fontWeight: '600',
                        }}
                      >
                        J
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginBottom: 4,
                        }}
                      >
                        <Text
                          style={{
                            color: '#FFFFFF',
                            fontSize: 14,
                            fontWeight: '600',
                            fontFamily: 'LibreCaslonText',
                          }}
                        >
                          John
                        </Text>
                        <Text
                          style={{
                            color: 'rgba(255, 255, 255, 0.5)',
                            fontSize: 12,
                            marginLeft: 8,
                            fontFamily: 'LibreCaslonText',
                          }}
                        >
                          7m ago
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontSize: 14,
                          lineHeight: 18,
                          fontFamily: 'LibreCaslonText',
                        }}
                      >
                        Joining from Australia! God is so good 🌅 Praying for
                        healing and peace for all
                      </Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                    <View
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        backgroundColor: '#FF5722',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 12,
                      }}
                    >
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontSize: 14,
                          fontWeight: '600',
                        }}
                      >
                        A
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginBottom: 4,
                        }}
                      >
                        <Text
                          style={{
                            color: '#FFFFFF',
                            fontSize: 14,
                            fontWeight: '600',
                            fontFamily: 'LibreCaslonText',
                          }}
                        >
                          Anna
                        </Text>
                        <Text
                          style={{
                            color: 'rgba(255, 255, 255, 0.5)',
                            fontSize: 12,
                            marginLeft: 8,
                            fontFamily: 'LibreCaslonText',
                          }}
                        >
                          10m ago
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontSize: 14,
                          lineHeight: 18,
                          fontFamily: 'LibreCaslonText',
                        }}
                      >
                        This is so powerful! Feeling the presence of God right
                        now 💕 Love you all
                      </Text>
                    </View>
                  </View>
                </View>
              </ScrollView>

              {/* Comment Input */}
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 16,
                  paddingBottom: 0,
                  borderTopWidth: 1,
                  borderTopColor: 'rgba(255, 255, 255, 0.1)',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}
                >
                  {/* Send a blessing input container */}
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: 24,
                      paddingLeft: 16,
                      paddingRight: 4,
                      paddingVertical: 4,
                      marginRight: 8,
                    }}
                  >
                    <Text
                      style={{
                        flex: 1,
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: 14,
                        fontFamily: 'LibreCaslonText',
                        paddingVertical: 10,
                      }}
                    >
                      Send a blessing
                    </Text>

                    {/* Send Button */}
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#4CAF50',
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 4,
                      }}
                    >
                      <Ionicons name="send" size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>

                  {/* Heart Button - Outside container */}
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 8,
                    }}
                  >
                    <Text style={{ fontSize: 18 }}>❤️</Text>
                  </TouchableOpacity>

                  {/* Pray Button - Outside container */}
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 18 }}>🙏</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          )}
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

export default LivePrayerPage;
