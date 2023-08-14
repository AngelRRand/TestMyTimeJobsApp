import { createStackNavigator } from '@react-navigation/stack';
import CartScreen from '../screens/CartScreen';

const Stack = createStackNavigator();

export default function CartStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen options={{ headerTitle: () => null }} name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
}