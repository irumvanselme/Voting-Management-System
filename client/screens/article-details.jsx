import { Alert, View } from "react-native";
import { Button } from "../components/theme/button";
import Text from "../components/theme/text";
import { Screen } from "../layouts/screen";
import { useContext } from "react";
import { AppContext } from "../contexts/app-context";
import { get, post } from "../utils/http";

export default function ArticleDetails({ navigation, route }) {
	let item = route.params.item;

	const { authUser } = useContext(AppContext);

	async function hasVoted() {
		let res = await get("api/voters/" + authUser.id + "/has-voted");
		return res.data == true;
	}

	const vote = async () => {
		try {
			if (await hasVoted()) {
				Alert.alert("Bad Request", "You have already voted");
				return;
			} else {
				await post("api/voters/" + authUser.id + "/vote/+" + item.id);
				Alert.alert(
					"Success",
					"You have succesfully voted " + item.fullNames
				);
				navigation.navigate("Articles");
			}
		} catch (error) {
			console.log(error.response.data);
			Alert.alert("An error occured");
		}
	};

	return (
		<Screen>
			<Text
				size={20}
				bold
				styles={{
					marginTop: 40,
				}}
			>
				{item.fullNames}
			</Text>
			<Text size={16} styles={{ marginTop: 20 }}>
				{item.missionStatement}
			</Text>
			<Text size={16} styles={{ marginTop: 20 }}>
				{item.phoneNumber}
			</Text>
			<View
				style={{
					marginTop: 30,
				}}
			>
				<Button title={"Vote"} onPress={vote} />
			</View>
		</Screen>
	);
}
