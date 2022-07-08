import { Alert, ScrollView, View } from "react-native";
import { Input } from "../components/theme/input";
import { Button } from "../components/theme/button";
import Text from "../components/theme/text";
import { Screen } from "../layouts/screen";
import { useState } from "react";
import { validate } from "../utils/validator";
import { post } from "../utils/http";

export function NewCandidate({ navigation }) {
	const [fullNames, setFullNames] = useState("");
	const [nationalId, setNationalId] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [profilePicture, setProfilePicture] = useState("");
	const [missionStatement, setMissionStatement] = useState("");

	async function createCandidate() {
		let data = {
			fullNames,
			nationalId,
			phoneNumber,
			profilePicture,
			missionStatement,
		};

		let [passes, info] = validate(data, {
			fullNames: "required|string|min:2",
			nationalId: "required|string|min:16|max:16",
			phoneNumber: "required|min:9",
			profilePicture: "required",
			missionStatement: "required|string",
		});

		if (!passes) {
			Alert.alert("Bad Request", info[0][0]);
			return;
		}

		try {
			let res = await post("api/candidates", data);

			if (res.status == 202) {
				Alert.alert("Success", "Candidate created successfully");
				navigation.navigate("Candidates");
			} else {
				Alert.alert("Bad Request", "Check if your fields are valid");
			}
		} catch (error) {}
	}

	return (
		<Screen>
			<ScrollView>
				<View style={{ marginTop: 20 }}>
					<Input label="Candidate names" handler={setFullNames} />
					<Input label="National Id" handler={setNationalId} />
					<Input label="Phone number" handler={setPhoneNumber} />
					<Input
						label="Profile Picture"
						handler={setProfilePicture}
					/>

					<Input
						textarea
						label="Mission Statement"
						height={200}
						handler={setMissionStatement}
					/>
					<View
						style={{
							marginTop: 20,
						}}
					>
						<Button
							title={"Create Candidate"}
							onPress={createCandidate}
						/>
					</View>
				</View>
			</ScrollView>
		</Screen>
	);
}
