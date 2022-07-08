import { useContext, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { Button } from "../../components/theme/button";
import { Input } from "../../components/theme/input";
import Text from "../../components/theme/text";
import { Screen } from "../../layouts/screen";
import { Colors } from "../../utils/constants";
import { get, post } from "../../utils/http";
import { validate } from "../../utils/validator";

import * as SecureStore from "expo-secure-store";
import { AppContext } from "../../contexts/app-context";

export default function LoginScreen({ navigation }) {
	const [email, setLogin] = useState("");
	const [password, setPassword] = useState("");

	const { setAuthUser, setIsLoggedIn } = useContext(AppContext);

	async function loginHandler() {
		let data = { email, password };

		let [passes, info] = validate(data, {
			email: "required",
			password: "required",
		});

		data.login = data.email;

		if (!passes) {
			Alert.alert("Bad Request", info[0][0]);
			return;
		}

		try {
			let res = await post("api/auth/signin", data);

			await SecureStore.setItemAsync("token", res.data.message);

			let user = await get("api/auth/profile", {
				headers: {
					Authorization: `Bearer ${res.data.message}`,
				},
			});

			setAuthUser(user.data);
			setIsLoggedIn(true);

			Alert.alert("Success", "Login Successful");
			navigation.navigate("App");
		} catch (error) {
			console.log(error);
			if (error.response.status == 400) {
				Alert.alert("Bad Request", error.response.data.message);
			} else {
				Alert.alert("Invalid Credentials", "Invalid Credentials");
			}
		}
	}

	return (
		<Screen mt>
			<View
				style={{
					marginTop: 20,
				}}
			>
				<Text size={30} medium align="center" color={Colors.primary}>
					Welcome back.
				</Text>
			</View>
			<View style={{ marginTop: 30 }}>
				<Input label="Email or username" handler={setLogin} />
				<Input label="Password" handler={setPassword} password />
			</View>
			<Button title="Login" onPress={loginHandler} />
			<View>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate("Register");
					}}
				>
					<Text align="center" color={Colors.primary}>
						Don't Have an account ?
					</Text>
				</TouchableOpacity>
			</View>
		</Screen>
	);
}
