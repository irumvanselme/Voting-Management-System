import { Image, TouchableOpacity, View } from "react-native";
import { Colors } from "../../utils/constants";
import { Button } from "../theme/button";
import Text from "../theme/text";

export function renderCandidate(navigation, hasVoted) {
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
							<Text bold>{item.fullNames}</Text>
							<Text
								styles={{
									marginTop: 20,
								}}
							>
								Phone number
							</Text>
							<Text size={15} medium color={Colors.primary}>
								{item.phoneNumber}
							</Text>
							{hasVoted && (
								<Text>Total Votes: {item.totalVotes}</Text>
							)}
						</View>
					</View>
				</View>
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
			</TouchableOpacity>
		);
	};
}
