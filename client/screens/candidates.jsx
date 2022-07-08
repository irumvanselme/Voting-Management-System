import { useContext, useEffect, useState } from "react";
import {
	DevSettings,
	FlatList,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
	View,
} from "react-native";
import Text from "../components/theme/text";
import { Screen } from "../layouts/screen";
import { get } from "../utils/http";

import { MaterialIcons, Feather, AntDesign } from "@expo/vector-icons";
import { Colors } from "../utils/constants";
import * as SecureStore from "expo-secure-store";
import { AppContext } from "../contexts/app-context";
import { renderCandidate } from "../components/atoms/candidate";

export function Candidates({ navigation }) {
	const [articles, setArticles] = useState([]);
	const [isFetching, setIsFetching] = useState(false);

	async function getArticles() {
		try {
			setIsFetching(true);
			let data = await get("api/candidates");

			setArticles(data.data.reverse(0));
			setIsFetching(false);
		} catch (error) {
			("An error occured");
		}
	}

	useEffect(() => {
		getArticles();
	}, []);

	const [hasVoted_, setHasVoted] = useState(false);

	const { authUser } = useContext(AppContext);

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

	useEffect(() => {
		(async function () {
			setHasVoted(await hasVoted());
		})();
	}, []);

	async function logOut() {
		try {
			// await SecureStore.setItemAsync("tokne", "None");
			await SecureStore.deleteItemAsync("token");
			DevSettings.reload();
			// await navigation.navigate("Register");
		} catch (error) {
			error;
			setIsFetching(false);
		}
	}

	return (
		<Screen full={false}>
			<View
				style={{
					flex: 1,
					flexGrow: 1,
				}}
			>
				<View
					style={{
						flex: 1,
					}}
				>
					<FlatList
						refreshing={isFetching}
						style={{ height: 40 }}
						showsVerticalScrollIndicator={false}
						data={articles}
						renderItem={renderCandidate(
							navigation,
							hasVoted_,
							authUser.role
						)}
						onRefresh={getArticles}
						ListFooterComponent={() => (
							<View
								style={{
									height: 70,
									justifyContent: "center",
								}}
							>
								<Text align="center">No more candidates</Text>
							</View>
						)}
					/>
				</View>
			</View>
			<View
				style={{
					position: "absolute",
					bottom: 20,
					right: 20,
					width: 70,
					height: authUser.role == "ADMIN" ? 200 : 130,
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<View
					style={{
						backgroundColor: Colors.primary,
						width: 50,
						height: 50,
						borderRadius: 25,
						right: 0,
						zIndex: 1,
						elevation: 10,
					}}
				>
					<TouchableOpacity
						onPress={logOut}
						style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<AntDesign name="logout" size={20} color="white" />
					</TouchableOpacity>
				</View>
				<View
					style={{
						backgroundColor: Colors.primary,
						width: authUser.role == "ADMIN" ? 60 : 70,
						height: authUser.role == "ADMIN" ? 60 : 70,
						borderRadius: 35,
						right: 0,
						zIndex: 1,
						elevation: 10,
					}}
				>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("Profile");
						}}
						style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Feather name="user" size={24} color="white" />
					</TouchableOpacity>
				</View>

				{authUser.role == "ADMIN" && (
					<View
						style={{
							backgroundColor: Colors.primary,
							width: 70,
							height: 70,
							borderRadius: 35,
							right: 0,
							zIndex: 1,
							elevation: 10,
						}}
					>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate("NewCandidate");
							}}
							style={{
								flex: 1,
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Feather name="plus" size={24} color="white" />
						</TouchableOpacity>
					</View>
				)}
			</View>
		</Screen>
	);
}
