import { View, Text, StyleSheet } from 'react-native';
import Button from '@/components/Button';

export default function Tab() {
  return (
    <View style={styles.container}>
      <Text>Tab [Cuenta]</Text>
      <Button theme="primary" label="Choose a photo" />
      <Button label="Use this photo" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
