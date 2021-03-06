import { Image, TouchableOpacity, View } from "react-native";
import { backend_url, get } from "../../utils/http";
import { Button } from "../theme/button";
import Text from "../theme/text";

export function renderCandidate(navigation, hasVoted, role) {
	return function ({ item, index, separators }) {
		return (
			<TouchableOpacity
				onPress={() => {
					navigation.navigate("CandidateDetails", {
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
					padding: 10,
					backgroundColor: "white",
				}}
			>
				<View>
					<View
						style={{
							flexDirection: "row",
						}}
					>
						<View>
							<Image
								source={{
									uri: `${backend_url}api/candidates/load/${item.profilePicture}`,
								}}
								style={{
									width: 100,
									height: 100,
								}}
							/>
						</View>
						<View
							style={{
								paddingLeft: 10,
							}}
						>
							<Text
								bold
								size={20}
								styles={{
									paddingBottom: 10,
									paddingTop: 10,
								}}
							>
								{item.fullNames}
							</Text>
							<Text
								styles={{
									textDecorationLine: "underline",
								}}
							>
								Mission Statement
							</Text>
							<Text
								styles={{
									paddingBottom: 10,
									maxWidth: 230,
								}}
							>
								{item.missionStatement}
							</Text>

							{hasVoted && (
								<Text bold>Total Votes: {item.totalVotes}</Text>
							)}
						</View>
					</View>
				</View>
				{role == "VOTER" && (
					<View style={{ marginTop: 20 }}>
						<Button
							title={"More Details"}
							onPress={() => {
								navigation.navigate("CandidateDetails", {
									item,
								});
							}}
						/>
					</View>
				)}
			</TouchableOpacity>
		);
	};
}
