import { Text as Typo } from "react-native";
import { Colors } from "../../utils/constants";

export default function Text({
	children,
	bold,
	medium,
	small,
	size = 16,
	color = Colors.text,
	align = "left",
	styles,
	...props
}) {
	return (
		<Typo
			style={[
				{
					fontSize: size,
					fontFamily: "DMSans_400Regular",
					color: color,
					textAlign: align,
				},
				bold ? { fontFamily: "DMSans_700Bold" } : "DMSans_400Regular",
				medium
					? { fontFamily: "DMSans_500Medium" }
					: "DMSans_400Regular",
				styles,
			]}
			{...props}
		>
			{children}
		</Typo>
	);
}
