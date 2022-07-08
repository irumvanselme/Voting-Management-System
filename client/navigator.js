import {
	createStackNavigator,
	CardStyleInterpolators,
} from "@react-navigation/stack";
import { Text, View } from "react-native";
import ArticleDetails from "./screens/article-details";
import { Articles } from "./screens/articles";

import { Ionicons } from "@expo/vector-icons";
import LoginScreen from "./screens/auth/login";
import RegisterScreen from "./screens/auth/register";
import React, { useContext } from "react";
import { AppContext } from "./contexts/app-context";
import NewArticle from "./screens/new-article";
import { LoadingScreen } from "./screens/loading";
import { Profile } from "./screens/profile";
import { Colors } from "./utils/constants";
import { StatusBar } from "expo-status-bar";

export const RootNavigator = () => {
	const { isLoggedIn } = useContext(AppContext);

	return <AuthNavigator />;
};

const AuthStack = createStackNavigator();

function AuthNavigator() {
	return (
		<AuthStack.Navigator
			screenOptions={{
				headerShown: false,
				gestureEnabled: true,
				gestureDirection: "horizontal",
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
			}}
		>
			<AuthStack.Screen name="Loading" component={LoadingScreen} />
			<AuthStack.Screen name="Login" component={LoginScreen} />
			<AuthStack.Screen name="Register" component={RegisterScreen} />
			<AuthStack.Screen
				name="App"
				options={{
					headerLeft: null,
					gestureEnabled: false,
				}}
				component={AppNavigator}
			/>
		</AuthStack.Navigator>
	);
}

const Stack = createStackNavigator();

function AppNavigator({ navigation }) {
	navigation.addListener("beforeRemove", (e) => {
		// console.log("Yello no thing 1");
		e.preventDefault();
	});

	return (
		<>
			<StatusBar style="light" />
			<Stack.Navigator
				screenOptions={{
					gestureEnabled: true,
					gestureDirection: "horizontal",
					cardStyleInterpolator:
						CardStyleInterpolators.forHorizontalIOS,
					headerStyle: {
						backgroundColor: Colors.primary,
					},

					headerTitleStyle: {
						color: "white",
						fontFamily: "DMSans_500Medium",
					},

					headerBackImage: () => (
						<Ionicons name="chevron-back" size={24} color="white" />
					),
				}}
			>
				<Stack.Screen
					name="Articles"
					component={Articles}
					options={{
						headerLeft: null,
						gestureEnabled: false,
					}}
				/>
				<Stack.Screen name="NewArticle" component={NewArticle} />
				<Stack.Screen
					name="ArticleDetails"
					options={({ route }) => ({
						title: `Reading ${route.params.item.title}`,
					})}
					component={ArticleDetails}
				/>
				<Stack.Screen name="Profile" component={Profile} />
			</Stack.Navigator>
		</>
	);
}
