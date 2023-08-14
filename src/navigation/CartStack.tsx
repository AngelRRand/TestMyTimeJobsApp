import { createStackNavigator } from '@react-navigation/stack';
import CartScreen from '../screens/CartScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createStackNavigator();

export default function CartStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen options={{ headerTitle: () => null }} name="Cart" component={CartScreen} />
      <Stack.Screen options={{ headerTitle: () => null }} name="Detail" component={DetailsScreen} />

    </Stack.Navigator>
  );
}