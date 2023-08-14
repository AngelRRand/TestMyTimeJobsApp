import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import UserStack from './UserStack';
import CartStack from './CartStack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

const AppStack = () => {

    const counts = useSelector((state: RootState) => state.products.ProductsCart);
    const cartItemCount = counts.reduce((total, item) => total + item.count, 0);

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarLabel: "",
                    headerShown: false,
                    tabBarStyle: {
                        height: 55,
                        paddingTop: 10,
                        backgroundColor: "#ffffff",
                    },
                }}
            >

                <Tab.Screen
                    name="HomeStack"
                    component={HomeStack}
                    options={{
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Icon
                                    name="home"
                                    size={30}
                                    color="#800040"
                                />
                            ) : (
                                <Icon
                                    name="home"
                                    size={30}
                                    color="#222222"
                                />
                            ),
                    }}
                />


                <Tab.Screen
                    name="CartStack"
                    component={CartStack}
                    options={{
                        tabBarIcon: ({ focused }) =>
                            <View>
                                <Icon
                                    name="shopping-cart"
                                    size={30}
                                    color={focused ? "#800040" : "#222222"}
                                />
                                {cartItemCount > 0 && (
                                    <View style={{ position: 'absolute', top: -5, right: -10, backgroundColor: "#800040", borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: 'white', fontSize: 10 }}>{cartItemCount}</Text>
                                    </View>
                                )}
                            </View>
                    }}
                />

            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default AppStack