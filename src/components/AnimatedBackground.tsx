import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, StyleSheet, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFE7', // Cream base color from style guide
  },
  yellowGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.6,
  },
  blueGradient: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: width * 0.8,
    height: '100%',
  },
  noiseOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.03,
  },
});

export const AnimatedBackground = () => {
  return (
    <View style={styles.container}>
      {/* Yellow Gradient - From Bottom */}
      <View style={styles.yellowGradient}>
        <LinearGradient
          colors={[
            'rgba(255, 215, 0, 0.4)', // Gold
            'rgba(255, 228, 181, 0.6)', // Moccasin
            'rgba(255, 239, 213, 0.3)', // Papaya
            'transparent',
          ]}
          locations={[0, 0.3, 0.6, 1]}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          style={StyleSheet.absoluteFillObject}
        />
      </View>

      {/* Blue Gradient - From Right Side Only */}
      <View style={styles.blueGradient}>
        <LinearGradient
          colors={[
            'rgba(135, 206, 235, 0.5)', // Sky Blue
            'rgba(100, 149, 237, 0.3)', // Cornflower Blue
            'rgba(70, 130, 180, 0.2)', // Steel Blue
            'transparent',
          ]}
          locations={[0, 0.3, 0.6, 1]}
          start={{ x: 1, y: 0.5 }}
          end={{ x: 0, y: 0.5 }}
          style={StyleSheet.absoluteFillObject}
        />
      </View>

      {/* Noise Overlay for texture */}
      <View style={styles.noiseOverlay}>
        {/* Create a grid of small semi-transparent dots to simulate noise */}
        {Array.from({ length: 30 }).map((_, i) => {
          const randomKey = `noise-${Math.random()}-${Date.now()}-${i}`;
          return (
            <View
              key={randomKey}
              style={{
                position: 'absolute',
                width: 2,
                height: 2,
                backgroundColor: '#000',
                opacity: Math.random() * 0.1,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                borderRadius: 1,
              }}
            />
          );
        })}
      </View>
    </View>
  );
};
