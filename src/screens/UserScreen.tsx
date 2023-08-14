import { View, Text } from 'react-native'
import React from 'react'
import Layoud from '../components/container/Layoud'
import { ScrollView } from 'native-base'
const UserScreen = () => {
	return (
		<Layoud >
			<ScrollView>
				<Text>UserScreen</Text>
			</ScrollView>
		</Layoud>
	)
}

export default UserScreen