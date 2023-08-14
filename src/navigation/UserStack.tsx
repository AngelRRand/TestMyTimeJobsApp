import { createStackNavigator } from '@react-navigation/stack';
import UserScreen from '../screens/UserScreen';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen options={{ headerTitle: () => null }} name="User" component={UserScreen} />
    </Stack.Navigator>
  );
}