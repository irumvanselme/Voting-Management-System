import { View } from "react-native";
import Text from "../components/theme/text";
import { Screen } from "../layouts/screen";

export default function ArticleDetails({ navigation, route }) {
	let item = route.params.item;

	return (
		<Screen>
			<Text size={20} bold>
				{item.title}
			</Text>
			<Text size={16} styles={{ marginTop: 20 }}>
				{item.summary}
			</Text>
			<Text size={16} styles={{ marginTop: 20 }}>
				{item.body}
			</Text>
		</Screen>
	);
}
