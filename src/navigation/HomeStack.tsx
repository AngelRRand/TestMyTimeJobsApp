import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen options={{ headerTitle: () => null }} name="Home" component={HomeScreen} />
      <Stack.Screen options={{ headerTitle: () => null }} name="Detail" component={DetailsScreen} />

    </Stack.Navigator>
  );
}