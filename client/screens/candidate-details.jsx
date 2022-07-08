import { Alert, Image, View } from "react-native";
import { Button } from "../components/theme/button";
import Text from "../components/theme/text";
import { Screen } from "../layouts/screen";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/app-context";
import { get, post } from "../utils/http";

export function CandidateDetails({ navigation, route }) {
	let item = route.params.item;
	const [hasVoted_, setHasVoted] = useState(false);

	const { authUser } = useContext(AppContext);

	useEffect(() => {
		(async function () {
			setHasVoted(await hasVoted());
		})();
	}, []);

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
				navigation.navigate("Candidates");
			}
		} catch (error) {
			console.log(error.response.data);
			Alert.alert("An error occured");
		}
	};

	return (
		<Screen>
			<View>
				<Image
					source={{
						uri: item.profilePicture,
					}}
					style={{
						width: "100%",
						height: 300,
					}}
				/>
			</View>
			<View
				style={{
					marginTop: 10,
				}}
			>
				{hasVoted_ && <Text>Total Votes: {item.totalVotes}</Text>}
			</View>
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
