import { Alert, ScrollView, View } from "react-native";
import { Input } from "../components/theme/input";
import { Button } from "../components/theme/button";
import Text from "../components/theme/text";
import { Screen } from "../layouts/screen";
import { useState } from "react";
import { validate } from "../utils/validator";
import { post } from "../utils/http";

export default function NewArticle({ navigation }) {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [summary, setSummary] = useState("");

	async function createArticle() {
		let data = { title, body, summary };

		let [passes, info] = validate(data, {
			title: "required",
			body: "required",
			summary: "required",
		});

		if (!passes) {
			Alert.alert("Bad Request", info[0][0]);
			return;
		}

		try {
			let res = await post("api/articles", data);

			if (res.status == 201) {
				Alert.alert("Success", "Article created successfully");
				navigation.navigate("App");
			} else {
				Alert.alert("Bad Request", "Check if your fields are valid");
			}
		} catch (error) {}
	}

	return (
		<Screen>
			<ScrollView>
				<View style={{ marginTop: 20 }}>
					<Input label="Article title" handler={setTitle} />
					<Input
						textarea
						label="Article Summary"
						handler={setSummary}
					/>
					<Input
						textarea
						label="Article Body"
						height={200}
						handler={setBody}
					/>
					<Button title={"Create Article"} onPress={createArticle} />
				</View>
			</ScrollView>
		</Screen>
	);
}
