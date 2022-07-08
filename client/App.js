import { StatusBar } from "expo-status-bar";
import { Articles } from "./screens/articles";

import {
	useFonts,
	DMSans_400Regular,
	DMSans_500Medium,
	DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "./navigator";
import { AppProvider } from "./contexts/app-context";

export default function App() {
	let [fontsLoaded] = useFonts({
		DMSans_400Regular,
		DMSans_500Medium,
		DMSans_700Bold,
	});

	if (!fontsLoaded) {
		return (
			<View>
				<Text>Lding</Text>
			</View>
		);
	}

	return (
		<NavigationContainer>
			<StatusBar style="auto" />
			<AppProvider>
				<RootNavigator />
			</AppProvider>
		</NavigationContainer>
	);
}
