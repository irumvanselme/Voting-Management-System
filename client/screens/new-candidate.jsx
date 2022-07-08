import { Alert, ScrollView, View } from "react-native";
import { Input } from "../components/theme/input";
import { Button } from "../components/theme/button";
import Text from "../components/theme/text";
import { Screen } from "../layouts/screen";
import { useState } from "react";
import { validate } from "../utils/validator";
import { post, put } from "../utils/http";

import * as ImagePicker from "expo-image-picker";

export function NewCandidate({ navigation }) {
	const [fullNames, setFullNames] = useState("");
	const [nationalId, setNationalId] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [profilePicture, setProfilePicture] = useState("");
	const [missionStatement, setMissionStatement] = useState("");

	const [image, setImage] = useState(null);

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
			missionStatement: "required|string",
		});

		if (!passes) {
			Alert.alert("Bad Request", info[0][0]);
			return;
		}

		try {
			let res = await post("api/candidates", data);

			if (res.status == 202) {
				var uploadData = new FormData();
				uploadData.append("diploma", image);

				let uploadRes = await put(
					`api/candidates/${res.data.id}/change-profile`,
					uploadData
				);

				uploadRes.data;

				Alert.alert("Success", "Candidate created successfully");
				navigation.navigate("Candidates");
			} else {
				Alert.alert("Bad Request", "Check if your fields are valid");
			}
		} catch (error) {}
	}

	async function pickImage() {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [5, 5],
			quality: 1,
		});

		result;

		if (!result.cancelled) {
			let localUri = result.uri;
			let filename = localUri.split("/").pop();

			// Infer the type of the image
			let match = /\.(\w+)$/.exec(filename);
			let type = match ? `image/${match[1]}` : `image`;

			setImage({
				type: type,
				uri: result.uri,
				name: filename,
			});
		}
	}

	return (
		<Screen>
			<ScrollView>
				<View style={{ marginTop: 20 }}>
					<Input label="Candidate names" handler={setFullNames} />
					<Input label="National Id" handler={setNationalId} />
					<Input label="Phone number" handler={setPhoneNumber} />

					<Input
						textarea
						label="Mission Statement"
						height={200}
						handler={setMissionStatement}
					/>
					<Button title={"Upload an image"} onPress={pickImage} />
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
