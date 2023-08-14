import React from 'react'
import { VStack, NativeBaseProvider, Center, Container } from 'native-base'
import Header from './header/Header';
import { layoud } from '../../types/app';
import { SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const Layoud: React.FC<layoud> = ({ children }) => {
	return (
		<NativeBaseProvider>
			<SafeAreaView style={{ flex: 1, width: '100%' }}>
				<LinearGradient
					start={{ x: 0, y: 0.1 }}
					end={{ x: 3, y: 0 }}
					colors={['#460626', '#e75fa3']}
					style={{ flex: 1 }}
				>
					<Header />

					<Center flex={1}>
						<VStack flex={1} space={8}>
							{children}
						</VStack>
					</Center>

				</LinearGradient>
			</SafeAreaView>
		</NativeBaseProvider >
	)
}

export default Layoud