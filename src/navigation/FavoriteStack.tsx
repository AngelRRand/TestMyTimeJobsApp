import { createStackNavigator } from '@react-navigation/stack';
import FavoriteScreen from '../screens/FavoriteScreen';

const Stack = createStackNavigator();

export default function FavoriteStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen options={{ headerTitle: () => null }} name="Favorite" component={FavoriteScreen} />
    </Stack.Navigator>
  );
}