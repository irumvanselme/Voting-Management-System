import { TouchableOpacity, View } from "react-native";
import { Colors } from "../../utils/constants";
import Typo from "./text";

export function Button({ title, color = Colors.primary, onPress }) {
	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.7}
			style={{
				elevation: 10,
				marginVertical: 10,
			}}
		>
			<View
				style={{
					backgroundColor: color,
					padding: 10,
					borderRadius: 2,
				}}
			>
				<Typo align="center" color={Colors.textLight}>
					{title}
				</Typo>
			</View>
		</TouchableOpacity>
	);
}
