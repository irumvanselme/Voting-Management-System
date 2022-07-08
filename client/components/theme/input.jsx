import { useState } from "react";
import { TextInput, View } from "react-native";
import { Colors } from "../../utils/constants";
import Text from "./text";

export function Input({
	label,
	handler,
	textarea = false,
	height = 100,
	password = false,
}) {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<View
			style={{
				marginVertical: 5,
			}}
		>
			<Text>{label}</Text>
			{textarea ? (
				<TextInput
					placeholder={label}
					keyboardType="default"
					multiline
					textAlignVertical="top"
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					onChangeText={handler}
					style={[
						{
							paddingVertical: 5,
							paddingHorizontal: 20,
							borderWidth: 2,
							borderRadius: 2,
							color: Colors.text,
							height,
							paddingTop: 10,
						},
						isFocused
							? {
									borderColor: Colors.primary,
							  }
							: {
									borderColor: "#aaa",
							  },
					]}
				/>
			) : (
				<TextInput
					placeholder={label}
					keyboardType="default"
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					onChangeText={handler}
					secureTextEntry={password}
					style={[
						{
							paddingVertical: 5,
							paddingHorizontal: 20,
							borderWidth: 2,
							borderRadius: 2,
							color: Colors.text,
						},
						isFocused
							? {
									borderColor: Colors.primary,
							  }
							: {
									borderColor: "#aaa",
							  },
					]}
				/>
			)}
		</View>
	);
}
