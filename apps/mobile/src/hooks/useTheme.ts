import { useColorScheme } from 'react-native';
import { Colors } from '../utils/colors';

export function useTheme() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return {
    isDark,
    colors: isDark ? Colors.dark : Colors,
  };
}
