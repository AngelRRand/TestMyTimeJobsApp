import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import FavoriteStack from './FavoriteStack';
import CartStack from './CartStack';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const AppStack = () => {
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
                    name="FavoriteStack"
                    component={FavoriteStack}
                    options={{
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Icon
                                    name="heart"
                                    size={30}
                                    color="#800040"
                                />
                            ) : (
                                <Icon
                                    name="heart"
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
                            focused ? (
                                <Icon
                                    name="shopping-cart"
                                    size={30}
                                    color="#800040"
                                />
                            ) : (
                                <Icon
                                    name="shopping-cart"
                                    size={30}
                                    color="#222222"
                                />
                            ),
                    }}
                />

            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default AppStack