import { useContext, useState } from "react";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import { Button } from "../../components/theme/button";
import { Input } from "../../components/theme/input";
import Text from "../../components/theme/text";
import { AppContext } from "../../contexts/app-context";
import { Screen } from "../../layouts/screen";
import { Colors } from "../../utils/constants";
import { post } from "../../utils/http";
import { validate } from "../../utils/validator";

export default function RegisterScreen({ navigation }) {
	const [names, setFullNames] = useState("");
	const [phoneNumber, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [nationalId, setNationalId] = useState("");
	const [address, setAddress] = useState("");
	const [password, setPassword] = useState("");

	async function register() {
		let data = { names, phoneNumber, address, nationalId, email, password };

		let [passes, info] = validate(data, {
			names: "required",
			email: "required|email",
			address: "required|string",
			phoneNumber: "required|string|min:9",
			nationalId: "required|string|min:16|max:16",
			password: "required",
		});

		data.fullNames = data.names;

		if (!passes) {
			Alert.alert("Bad Request", info[0][0]);
			return;
		}

		try {
			let res = await post("api/auth/register", data);
			res.data;

			Alert.alert("Success", "Registration Successful");
			navigation.navigate("Login");
		} catch (error) {
			error.response.data;
			Alert.alert(error.response.data, "User Already Registered");
		}
	}

	return (
		<Screen mt>
			<ScrollView>
				<View
					style={{
						marginTop: 20,
					}}
				>
					<Text
						size={30}
						medium
						align="center"
						color={Colors.primary}
					>
						Hello. have an account
					</Text>
				</View>
				<View style={{ marginTop: 30 }}>
					<Input label="Full names" handler={setFullNames} />
					<Input label="Email" handler={setEmail} />
					<Input label="Phone Number" handler={setUsername} />
					<Input label="Address" handler={setAddress} />
					<Input label="National Id" handler={setNationalId} />
					<Input label="Password" handler={setPassword} password />
				</View>
				<Button title="Create" onPress={register} />
				<View>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("Login");
						}}
					>
						<Text align="center" color={Colors.primary}>
							Already Have an account ?
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</Screen>
	);
}
