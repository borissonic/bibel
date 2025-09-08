import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import type React from 'react';
import { useState } from 'react';
import {
  Alert,
  Linking,
  Modal,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { Colors } from '@/theme/colors';

const versions = ['KJV', 'NKJV', 'NIV', 'ESV', 'NASB', 'CSB'];

const ItemRow: React.FC<{
  title: string;
  right?: React.ReactNode;
  onPress?: () => void;
}> = ({ title, right, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={onPress ? 0.8 : 1}
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 14,
      paddingHorizontal: 14,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0,0,0,0.06)',
    }}
  >
    <Text
      style={{
        fontSize: 16,
        color: Colors.text,
        fontFamily: 'LibreCaslonText',
      }}
    >
      {title}
    </Text>
    {right}
  </TouchableOpacity>
);

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View
    style={{
      backgroundColor: 'rgba(255,255,255,0.9)',
      borderRadius: 16,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.6)',
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
    }}
  >
    {children}
  </View>
);

export default function Settings() {
  const insets = useSafeAreaInsets();
  const [bibleVersion, setBibleVersion] = useState('ESV');
  const [haptics, setHaptics] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* Top bar */}
          <View
            style={{
              paddingTop: insets.top ? 0 : 8,
              paddingHorizontal: 16,
              marginBottom: 8,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity
                onPress={() => router.back()}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: Colors.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#000',
                  shadowOpacity: 0.08,
                  shadowRadius: 8,
                }}
              >
                <Ionicons name="chevron-back" size={18} color={Colors.text} />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: '700',
                  color: Colors.text,
                  fontFamily: 'LibreCaslonText',
                }}
              >
                Settings
              </Text>
              <View style={{ width: 36 }} />
            </View>
          </View>

          <ScrollView
            contentContainerStyle={{ padding: 16, paddingBottom: 28 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Bible Version */}
            <Card>
              <ItemRow
                title="Bible version"
                right={
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      style={{
                        color: Colors.text,
                        opacity: 0.7,
                        marginRight: 8,
                      }}
                    >
                      {bibleVersion}
                    </Text>
                    <Ionicons
                      name="chevron-forward"
                      size={16}
                      color={Colors.text}
                    />
                  </View>
                }
                onPress={() => setPickerOpen(true)}
              />
            </Card>

            {/* Toggles */}
            <View style={{ height: 12 }} />
            <Card>
              <ItemRow
                title="Haptics"
                right={<Switch value={haptics} onValueChange={setHaptics} />}
              />
              <ItemRow
                title="Vibration"
                right={
                  <Switch value={vibration} onValueChange={setVibration} />
                }
              />
            </Card>

            {/* Notifications & Subscription */}
            <View style={{ height: 12 }} />
            <Card>
              <ItemRow
                title="Notification settings"
                right={
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={Colors.text}
                  />
                }
                onPress={() => Linking.openSettings?.()}
              />
              <ItemRow
                title="Manage subscription"
                right={
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={Colors.text}
                  />
                }
                onPress={() =>
                  Alert.alert(
                    'Manage subscription',
                    'Hook up your subscription flow here.',
                  )
                }
              />
            </Card>

            {/* Account */}
            <View style={{ height: 12 }} />
            <Card>
              <ItemRow
                title="Delete my account"
                right={
                  <Ionicons name="trash-outline" size={16} color="#C0352B" />
                }
                onPress={() =>
                  Alert.alert(
                    'Delete account',
                    'This will permanently remove your data. Are you sure?',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      {
                        text: 'Delete',
                        style: 'destructive',
                        onPress: () =>
                          Alert.alert(
                            'Deleted',
                            'Your account has been scheduled for deletion.',
                          ),
                      },
                    ],
                  )
                }
              />
            </Card>

            {/* Links */}
            <View style={{ height: 12 }} />
            <Card>
              <ItemRow
                title="Feedback"
                right={
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={Colors.text}
                  />
                }
                onPress={() =>
                  Linking.openURL(
                    'mailto:feedback@example.com?subject=Bible%20Pray%20Feedback',
                  ).catch(() => {})
                }
              />
              <ItemRow
                title="Terms of Service"
                right={
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={Colors.text}
                  />
                }
                onPress={() =>
                  Linking.openURL('https://example.com/terms').catch(() => {})
                }
              />
              <ItemRow
                title="Privacy Policy"
                right={
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={Colors.text}
                  />
                }
                onPress={() =>
                  Linking.openURL('https://example.com/privacy').catch(() => {})
                }
              />
            </Card>
          </ScrollView>
        </SafeAreaView>

        {/* Bible version picker modal */}
        <Modal
          transparent
          visible={pickerOpen}
          animationType="fade"
          onRequestClose={() => setPickerOpen(false)}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.25)',
              justifyContent: 'center',
              padding: 24,
            }}
            activeOpacity={1}
            onPress={() => setPickerOpen(false)}
          >
            <View
              style={{
                backgroundColor: Colors.white,
                borderRadius: 16,
                padding: 16,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: Colors.text,
                  marginBottom: 12,
                  fontFamily: 'LibreCaslonText',
                }}
              >
                Select version
              </Text>
              {versions.map((v) => (
                <TouchableOpacity
                  key={v}
                  onPress={() => {
                    setBibleVersion(v);
                    setPickerOpen(false);
                  }}
                  style={{
                    paddingVertical: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{ fontSize: 16, color: Colors.text }}>{v}</Text>
                  {bibleVersion === v && (
                    <Ionicons name="checkmark" size={18} color={Colors.text} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </>
  );
}
