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
				names: {authUser.fullNames}
			</Text>
			<Text
				size={20}
				styles={{
					marginTop: 10,
				}}
			>
				email:{"        "}
				{authUser.email}
			</Text>
			<Text
				styles={{
					marginTop: 10,
				}}
			>
				address:{"         "}
				{authUser.address}
			</Text>

			<Text
				styles={{
					marginTop: 10,
				}}
			>
				Phone number: {authUser.phoneNumber}
			</Text>

			<Text
				styles={{
					marginTop: 10,
				}}
			>
				Nat ID:{"           "}
				{authUser.nationalId}
			</Text>
			<Text
				styles={{
					marginTop: 10,
				}}
			>
				Role :{"           "}
				{authUser.role}
			</Text>
		</View>
	);
}
