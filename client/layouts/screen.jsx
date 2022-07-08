import { SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import { Colors } from "../utils/constants";

export function Screen({ children, full = true, mt = false }) {
	return (
		<View
			style={{
				flex: 1,
				marginTop: mt ? StatusBar.currentHeight : 0,
				backgroundColor: Colors.background,
				paddingHorizontal: full ? 20 : 0,
			}}
		>
			<View
				style={{
					flexGrow: 1,
					paddingTop: 10,
				}}
			>
				{children}
			</View>
		</View>
	);
}
