import { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { AppContext } from "../contexts/app-context";

export function LoadingScreen({ navigation }) {
	const { isLoggedIn, isLoading } = useContext(AppContext);

	useEffect(() => {
		if (!isLoading) {
			if (isLoggedIn) navigation.navigate("App");
			else navigation.navigate("Login");
		}
	}, [isLoggedIn, isLoading]);

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text
				style={{
					textDecorationColor: "red",
				}}
			>
				sd
			</Text>
			<Text>Loading ...</Text>
		</View>
	);
}
