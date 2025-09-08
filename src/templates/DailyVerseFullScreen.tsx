import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import * as Sharing from 'expo-sharing';
import type React from 'react';
import { useRef } from 'react';
import {
  ImageBackground,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { captureRef } from 'react-native-view-shot';

import PrayIcon from '@/components/PrayIcon';

const DEFAULT_VERSE =
  '“Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God”';
const DEFAULT_REF = 'PHILIPPIANS 4:6';
const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=2400&fit=crop';

const DailyVerseFullScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const verse = (params.text as string) || DEFAULT_VERSE;
  const reference = (params.ref as string) || DEFAULT_REF;
  const image = (params.img as string) || DEFAULT_IMAGE;

  const shareViewRef = useRef<View>(null);

  const onShare = async () => {
    try {
      const target = shareViewRef.current;
      if (!target) return;
      const uri = await captureRef(target, {
        format: 'png',
        quality: 1,
        result: 'tmpfile',
      } as any);
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { mimeType: 'image/png' });
      } else {
        await Share.share({ message: `${verse}\n${reference}` });
      }
    } catch (_) {
      // ignore
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {/* Shareable block includes background, logo, and verse (no share button) */}
      <View ref={shareViewRef} collapsable={false} style={{ flex: 1 }}>
        <ImageBackground
          source={{ uri: image }}
          style={{ flex: 1 }}
          resizeMode="cover"
        >
          <LinearGradient
            colors={[
              'rgba(0,0,0,0.45)',
              'rgba(0,0,0,0.55)',
              'rgba(0,0,0,0.65)',
            ]}
            style={{ ...StyleSheet.absoluteFillObject }}
          />
          <SafeAreaView style={{ flex: 1 }}>
            {/* Top logo - revert to previous placement */}
            <View
              style={{
                paddingTop: insets.top + 4,
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <PrayIcon size={28} color="#FFFFFF" />
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 28,
                    marginLeft: 8,
                    fontWeight: '600',
                    fontFamily: 'LibreCaslonText',
                  }}
                >
                  Bible Pray
                </Text>
              </View>
            </View>

            {/* Tappable full-screen close */}
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => router.back()}
              style={{
                flex: 1,
                justifyContent: 'center',
                paddingHorizontal: 24,
              }}
            >
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 32,
                  lineHeight: 42,
                  textAlign: 'center',
                  fontFamily: 'LibreCaslonText',
                }}
              >
                {verse}
              </Text>
              <Text
                style={{
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: 14,
                  textAlign: 'center',
                  marginTop: 16,
                  letterSpacing: 2,
                  fontWeight: '600',
                  fontFamily: 'LibreCaslonText',
                }}
              >
                {reference}
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
        </ImageBackground>
      </View>

      {/* Bottom actions */}
      <View
        style={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 24 }}
      >
        <TouchableOpacity
          onPress={onShare}
          style={{
            backgroundColor: 'rgba(255,255,255,0.25)',
            paddingVertical: 14,
            borderRadius: 28,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.35)',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 18,
                fontWeight: '600',
                marginRight: 8,
                fontFamily: 'LibreCaslonText',
              }}
            >
              Share
            </Text>
            <Ionicons name="add" size={18} color="#FFFFFF" />
          </View>
        </TouchableOpacity>

        <Text
          style={{
            textAlign: 'center',
            color: 'rgba(255,255,255,0.9)',
            marginTop: 16,
            fontSize: 14,
            fontFamily: 'LibreCaslonText',
          }}
        >
          Or, tap anywhere to continue
        </Text>
      </View>
    </View>
  );
};

export default DailyVerseFullScreen;
