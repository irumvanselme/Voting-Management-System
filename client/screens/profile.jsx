import { useContext } from "react";
import { View } from "react-native";
import Text from "../components/theme/text";
import { AppContext } from "../contexts/app-context";

export function Profile() {
	const { authUser } = useContext(AppContext);

	return (
		<View
			style={{
				marginHorizontal: 20,
				paddingTop: 30,
			}}
		>
			<Text size={25} bold>
				{authUser.fullNames}
			</Text>
			<Text
				size={20}
				styles={{
					marginTop: 10,
				}}
			>
				{authUser.email}
			</Text>
			<Text
				styles={{
					marginTop: 10,
				}}
			>
				{authUser.username}
			</Text>
			<Text
				styles={{
					marginTop: 10,
				}}
			>
				{authUser.role}
			</Text>
		</View>
	);
}
