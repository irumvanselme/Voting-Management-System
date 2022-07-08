import { useContext } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { AppContext } from "../../contexts/app-context";
import { Colors } from "../../utils/constants";
import { Button } from "../theme/button";
import Text from "../theme/text";

export function renderCandidate(navigation, hasVoted, role) {
	return function ({ item, index, separators }) {
		role;
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
									uri: item.profilePicture,
								}}
								style={{
									width: 100,
									height: 100,
								}}
							/>
						</View>
						<View
							style={{
								paddingLeft: 20,
							}}
						>
							<Text
								bold
								size={20}
								styles={{
									paddingBottom: 20,
								}}
							>
								{item.fullNames}
							</Text>

							{hasVoted && (
								<Text>Total Votes: {item.totalVotes}</Text>
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
