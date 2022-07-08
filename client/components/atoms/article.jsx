import { TouchableOpacity, View } from "react-native";
import { Colors } from "../../utils/constants";
import Text from "../theme/text";

export function renderArticle(navigation) {
	return function ({ item, index, separators }) {
		return (
			<TouchableOpacity
				onPress={() => {
					navigation.navigate("ArticleDetails", {
						item,
					});
				}}
				style={{
					marginBottom: 20,
					backgroundColor: "white",
					marginHorizontal: 20,
					borderRadius: 10,
					borderColor: "#eee",
					borderWidth: 2,
					paddingVertical: 20,
					padding: 10,
					backgroundColor: "white",
				}}
			>
				<View style={{}}>
					<Text bold>{item.fullNames}</Text>
					<Text
						styles={{
							marginTop: 20,
						}}
					>
						{item.phoneNumber}
					</Text>
					<Text
						size={15}
						medium
						color={Colors.primary}
						style={{
							marginTop: 20,
						}}
					>
						{item.nationalId}
					</Text>
					<Text
						size={15}
						medium
						color={Colors.primary}
						style={{
							marginTop: 20,
						}}
					>
						{item.nationalId}
					</Text>
				</View>
			</TouchableOpacity>
		);
	};
}
