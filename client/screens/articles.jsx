import { useContext, useEffect, useState } from "react";
import {
	FlatList,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
	View,
} from "react-native";
import { renderArticle } from "../components/atoms/article";
import Text from "../components/theme/text";
import { Screen } from "../layouts/screen";
import { get } from "../utils/http";

import { MaterialIcons, Feather, AntDesign } from "@expo/vector-icons";
import { Colors } from "../utils/constants";
import * as SecureStore from "expo-secure-store";
import { AppContext } from "../contexts/app-context";

export function Articles({ navigation }) {
	const [articles, setArticles] = useState([]);
	const [isFetching, setIsFetching] = useState(false);

	async function getArticles() {
		setIsFetching(true);
		let data = await get("api/candidates");

		setArticles(data.data.reverse(0));
		setIsFetching(false);
	}

	useEffect(() => {
		getArticles();
	}, []);

	const [hasVoted_, setHasVoted] = useState(false);

	const { authUser } = useContext(AppContext);

	async function hasVoted() {
		let res = await get("api/voters/" + authUser.id + "/has-voted");

		return res.data == true;
	}

	useEffect(() => {
		(async function () {
			setHasVoted(await hasVoted());
		})();
	}, []);

	async function logOut() {
		try {
			console.log("Logging out");
			await SecureStore.deleteItemAsync("token");
			navigation.push("Login");
		} catch (error) {
			console.log(error);
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
						renderItem={renderArticle(navigation, hasVoted_)}
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
					height: 130,
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
			</View>
		</Screen>
	);
}
