import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, Stack } from 'expo-router';
import { useMemo, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Colors } from '@/theme/colors';

type DayStatus = 'active' | 'grace' | 'missed' | 'future' | 'idle';

function getMonthMatrix(year: number, month: number) {
  const first = new Date(year, month, 1);
  const startDay = first.getDay(); // 0..6 (Sun..Sat)
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const matrix: (number | null)[] = [];
  for (let i = 0; i < startDay; i += 1) matrix.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) matrix.push(d);
  // pad to complete weeks
  while (matrix.length % 7 !== 0) matrix.push(null);
  return matrix;
}

function addDays(d: Date, n: number) {
  const res = new Date(d);
  res.setDate(res.getDate() + n);
  return res;
}

function toWeeks<T>(arr: T[], size = 7): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function Streak() {
  const insets = useSafeAreaInsets();

  // Mocked data – replace with real user data later
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth()); // 0-indexed

  const currentStreak = 2; // example value; replace from state/store
  const graceTotal = 3;
  const graceUsed = 0;

  // Derive a streak start date from today and current streak (inclusive)
  const streakStart = addDays(today, 1 - currentStreak);
  // Date-based milestone thresholds (days since start)
  const milestoneDays = [2, 3, 7, 14, 30];
  const milestones = milestoneDays.map((d) => ({
    dayIndex: d,
    date: addDays(streakStart, d - 1),
  }));
  const nextMilestone = milestones.find((m) => m.dayIndex > currentStreak);
  const afterNext = milestones.find(
    (m) => m.dayIndex > (nextMilestone?.dayIndex ?? 0),
  );
  const daysUntilNext = nextMilestone
    ? nextMilestone.dayIndex - currentStreak
    : 0;
  const maxMilestone = milestoneDays[milestoneDays.length - 1];
  const rightMarkerDay = afterNext ? afterNext.dayIndex : maxMilestone;
  const scaleMax = rightMarkerDay; // scale bar to next-after-next or max
  const progressPct = Math.min((currentStreak / (scaleMax || 1)) * 100, 100);

  // Example progress for the calendar (days in this month)
  const practicedDays = new Set<number>([5, 6]);
  const graceDays = new Set<number>();

  const daysMatrix = useMemo(
    () => getMonthMatrix(viewYear, viewMonth),
    [viewYear, viewMonth],
  );
  const weeks = useMemo(() => toWeeks(daysMatrix), [daysMatrix]);

  function statusFor(day: number | null): DayStatus {
    if (day === null) return 'idle';
    const date = new Date(viewYear, viewMonth, day);
    const isFuture = date > today;
    if (isFuture) return 'future';
    if (practicedDays.has(day)) return 'active';
    if (graceDays.has(day)) return 'grace';
    return 'missed';
  }

  function prevMonth() {
    const d = new Date(viewYear, viewMonth - 1, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  }

  function nextMonth() {
    const d = new Date(viewYear, viewMonth + 1, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ flex: 1, backgroundColor: Colors.background }}>
        <AnimatedBackground />
        {/* Top bar */}
        <View style={{ paddingTop: insets.top + 6, paddingHorizontal: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => router.back()}
              accessibilityLabel="Close"
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: Colors.white,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: Colors.shadow,
                shadowOpacity: 0.08,
                shadowRadius: 8,
              }}
            >
              <Ionicons name="chevron-back" size={18} color={Colors.text} />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
                color: Colors.text,
                fontFamily: 'LibreCaslonText',
              }}
            >
              Streak Journey
            </Text>
            <View style={{ width: 36 }} />
          </View>
        </View>

        {/* Hero streak card directly under title */}
        <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
          <View
            style={{
              borderRadius: 24,
              overflow: 'hidden',
              shadowColor: Colors.shadow,
              shadowOpacity: 0.08,
              shadowRadius: 16,
              shadowOffset: { width: 0, height: 8 },
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.5)',
              backgroundColor: Colors.white,
            }}
          >
            {/* Journey artwork banner with overlayed streak */}
            <View style={{ height: 110, position: 'relative' }}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1492176273113-2d51f47b23b0?w=1600&h=900&fit=crop',
                }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
              {/* Streak number over image (white) */}
              <View
                style={{
                  position: 'absolute',
                  left: 12,
                  bottom: 8,
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                }}
              >
                <Text
                  style={{
                    fontSize: 48,
                    fontWeight: '800',
                    color: '#FFFFFF',
                    lineHeight: 48,
                    textShadowColor: 'rgba(0,0,0,0.25)',
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 2,
                  }}
                >
                  {' '}
                  {currentStreak}
                </Text>
                <Text
                  style={{
                    marginLeft: 6,
                    marginBottom: 4,
                    fontSize: 14,
                    color: '#FFFFFF',
                    fontFamily: 'LibreCaslonText',
                    textShadowColor: 'rgba(0,0,0,0.25)',
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 2,
                  }}
                >
                  day streak
                </Text>
              </View>
              {/* Small milestone pill in image (top-right) */}
              {nextMilestone && (
                <View
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    borderRadius: 14,
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0.06)',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Ionicons name="flame" size={12} color="#F59E0B" />
                  <Text
                    style={{
                      marginLeft: 6,
                      color: Colors.text,
                      fontWeight: '600',
                      fontSize: 11,
                      opacity: 0.9,
                    }}
                  >
                    {daysUntilNext} {daysUntilNext === 1 ? 'day' : 'days'} until
                    next milestone
                  </Text>
                </View>
              )}
            </View>
            {/* Streak content as continuation */}
            <View
              style={{
                padding: 16,
                backgroundColor: 'rgba(255,255,255,0.95)',
                position: 'relative',
              }}
            >
              {/* Streak progress bar (clean) */}
              <View style={{ marginTop: 4, marginBottom: 12 }}>
                <View
                  style={{
                    height: 10,
                    borderRadius: 8,
                    backgroundColor: Colors.accentAlt,
                    position: 'relative',
                  }}
                >
                  {/* Fill */}
                  <LinearGradient
                    colors={[Colors.accentAlt, Colors.accent]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={{
                      width: `${progressPct}%`,
                      height: '100%',
                      borderRadius: 8,
                    }}
                  />
                  {nextMilestone && (
                    <View
                      style={{
                        position: 'absolute',
                        left: '50%',
                        marginLeft: -6,
                        top: '50%',
                        transform: [{ translateY: -6 }],
                        width: 12,
                        height: 12,
                        borderRadius: 6,
                        backgroundColor:
                          currentStreak >= nextMilestone.dayIndex
                            ? Colors.accent
                            : Colors.white,
                        borderWidth: 2,
                        borderColor: Colors.accent,
                      }}
                    />
                  )}
                  {/* Right-most marker (next after the next, or max) */}
                  <View
                    style={{
                      position: 'absolute',
                      left: '100%',
                      marginLeft: -6,
                      top: '50%',
                      transform: [{ translateY: -6 }],
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor:
                        currentStreak >= (rightMarkerDay || 0)
                          ? Colors.accent
                          : Colors.white,
                      borderWidth: 2,
                      borderColor: Colors.accent,
                    }}
                  />
                </View>
                {/* Labels under bar: left=0, center=next, right=afterNext/max */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 6,
                  }}
                >
                  <Text
                    style={{ color: Colors.text, opacity: 0.7, fontSize: 12 }}
                  >
                    0
                  </Text>
                  <Text
                    style={{
                      color: Colors.text,
                      opacity: 0.9,
                      fontWeight: '700',
                      fontSize: 12,
                    }}
                  >
                    {nextMilestone ? nextMilestone.dayIndex : ''}
                  </Text>
                  <Text
                    style={{ color: Colors.text, opacity: 0.7, fontSize: 12 }}
                  >
                    {rightMarkerDay}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            style={{ marginTop: -14 }}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 0,
              paddingBottom: 8,
            }}
            showsVerticalScrollIndicator={false}
          >
            {/* Month header */}
            <View
              style={{
                marginTop: 0,
                marginBottom: 4,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: '700',
                  color: Colors.text,
                  fontFamily: 'LibreCaslonText',
                }}
              >
                {new Date(viewYear, viewMonth, 1).toLocaleString(undefined, {
                  month: 'long',
                  year: 'numeric',
                })}
              </Text>
              <View style={{ flexDirection: 'row', gap: 12 }}>
                {/* eslint-disable-next-line react/jsx-no-bind */}
                <TouchableOpacity onPress={prevMonth} style={{ padding: 6 }}>
                  <Ionicons name="chevron-back" size={20} color={Colors.text} />
                </TouchableOpacity>
                {/* eslint-disable-next-line react/jsx-no-bind */}
                <TouchableOpacity onPress={nextMonth} style={{ padding: 6 }}>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={Colors.text}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Summary glass card (above calendar) */}
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.9)',
                borderRadius: 16,
                paddingVertical: 8,
                paddingHorizontal: 12,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                shadowColor: Colors.shadow,
                shadowOpacity: 0.08,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.6)',
                marginBottom: 6,
              }}
            >
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 22,
                    color: Colors.text,
                    fontWeight: '700',
                  }}
                >
                  {practicedDays.size}
                </Text>
                <Text
                  style={{
                    color: Colors.text,
                    fontSize: 13,
                    fontFamily: 'LibreCaslonText',
                  }}
                >
                  Days practiced
                </Text>
              </View>
              <View
                style={{
                  width: 1,
                  height: 28,
                  backgroundColor: 'rgba(0,0,0,0.06)',
                }}
              />
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: Colors.text,
                    fontWeight: '700',
                  }}
                >
                  {graceTotal - graceUsed}/{graceTotal}
                </Text>
                <Text
                  style={{
                    color: Colors.text,
                    fontSize: 13,
                    fontFamily: 'LibreCaslonText',
                  }}
                >
                  Grace days left
                </Text>
              </View>
            </View>

            {/* Calendar glass card */}
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.85)',
                borderRadius: 16,
                padding: 10,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.5)',
                shadowColor: Colors.shadow,
                shadowOpacity: 0.06,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 3 },
              }}
            >
              {/* Weekday labels */}
              <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, idx) => (
                  <Text
                    // eslint-disable-next-line react/no-array-index-key
                    key={`weekday-${d}-${idx}`}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      color: Colors.text,
                      opacity: 0.7,
                      fontWeight: '600',
                    }}
                  >
                    {d}
                  </Text>
                ))}
              </View>

              {/* Calendar grid */}
              <View style={{ gap: 4 }}>
                {weeks.map((week, wi) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <View key={`week-row-${wi}`} style={{ flexDirection: 'row' }}>
                    {week.map((d, di) => {
                      const st = statusFor(d);
                      const baseStyle: any = {
                        flex: 1,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                      };
                      const numStyle: any = { fontSize: 15 };
                      let bg: any;
                      let color = Colors.text;
                      let borderColor = 'transparent';

                      if (st === 'active') {
                        bg = [Colors.accentAlt, Colors.accent];
                        color = Colors.text;
                      } else if (st === 'grace') {
                        borderColor = Colors.grace;
                        color = Colors.text;
                      } else if (st === 'missed') {
                        color = 'rgba(0,0,0,0.35)';
                      } else if (st === 'future') {
                        color = 'rgba(0,0,0,0.2)';
                      }

                      // Connected pill look for consecutive active days within the same week
                      const isActive = st === 'active' && typeof d === 'number';
                      const prevActive =
                        isActive &&
                        di > 0 &&
                        typeof week[di - 1] === 'number' &&
                        practicedDays.has(week[di - 1] as number);
                      const nextActive =
                        isActive &&
                        di < 6 &&
                        typeof week[di + 1] === 'number' &&
                        practicedDays.has(week[di + 1] as number);
                      let radiusStyle = {};
                      if (isActive) {
                        radiusStyle = {
                          borderTopLeftRadius: prevActive ? 8 : 18,
                          borderBottomLeftRadius: prevActive ? 8 : 18,
                          borderTopRightRadius: nextActive ? 8 : 18,
                          borderBottomRightRadius: nextActive ? 8 : 18,
                        };
                      }

                      return (
                        <View
                          // eslint-disable-next-line react/no-array-index-key
                          key={`day-cell-${wi}-${di}-${d}`}
                          style={baseStyle}
                        >
                          {/* eslint-disable-next-line no-nested-ternary */}
                          {d === null ? (
                            <View style={{ width: 30, height: 30 }} />
                          ) : bg ? (
                            <LinearGradient
                              colors={bg}
                              style={[
                                {
                                  width: 34,
                                  height: 28,
                                  borderRadius: 16,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  paddingHorizontal: 2,
                                },
                                radiusStyle,
                              ]}
                            >
                              <Text style={[numStyle, { color }]}>{d}</Text>
                            </LinearGradient>
                          ) : (
                            <View
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: 15,
                                borderWidth:
                                  borderColor !== 'transparent' ? 2 : 0,
                                borderColor,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Text style={[numStyle, { color }]}>{d}</Text>
                            </View>
                          )}
                        </View>
                      );
                    })}
                  </View>
                ))}
              </View>

              {/* Legend */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 6,
                  gap: 14,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: Colors.accent,
                      marginRight: 6,
                    }}
                  />
                  <Text style={{ color: Colors.text, fontSize: 13 }}>
                    Active
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      borderWidth: 2,
                      borderColor: Colors.grace,
                      marginRight: 6,
                    }}
                  />
                  <Text style={{ color: Colors.text, fontSize: 13 }}>
                    Grace
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: 'rgba(0,0,0,0.08)',
                      marginRight: 6,
                    }}
                  />
                  <Text style={{ color: 'rgba(0,0,0,0.6)', fontSize: 13 }}>
                    Missed
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
}
