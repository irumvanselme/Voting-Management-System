import { Alert, Image, View } from "react-native";
import { Button } from "../components/theme/button";
import Text from "../components/theme/text";
import { Screen } from "../layouts/screen";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/app-context";
import { backend_url, get, post } from "../utils/http";

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
		try {
			if (authUser != undefined && authUser.role != "ADMIN") {
				let res = await get("api/voters/" + authUser.id + "/has-voted");

				return res.data == true;
			} else {
				return true;
			}
		} catch (error) {
			error.response.data;
			("An error occured");
		}
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
			error.response.data;
			Alert.alert("An error occured");
		}
	};

	console.log(authUser.candidate);

	return (
		<Screen>
			<View>
				<Image
					source={{
						uri: `${backend_url}api/candidates/load/${item.profilePicture}`,
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
				styles={{
					marginTop: 20,
					textDecorationLine: "underline",
				}}
			>
				Full names
			</Text>
			<Text size={20} bold>
				{item.fullNames}
			</Text>
			<Text styles={{ marginTop: 10, textDecorationLine: "underline" }}>
				Mission Statement
			</Text>
			<Text size={16}>{item.missionStatement}</Text>

			<Text styles={{ marginTop: 10, textDecorationLine: "underline" }}>
				Phone Number
			</Text>
			<Text size={16}>{item.phoneNumber}</Text>

			<Text styles={{ marginTop: 10, textDecorationLine: "underline" }}>
				Nataional Id
			</Text>
			<Text size={16}>{item.nationalId}</Text>
			{authUser.role != "ADMIN" && (
				<View
					style={{
						marginTop: 30,
					}}
				>
					<Button
						disabled={authUser.candidate !== null}
						title={
							"Vote " +
							(authUser.candidate != null && "[Done Already]")
						}
						onPress={vote}
					/>
				</View>
			)}
		</Screen>
	);
}
