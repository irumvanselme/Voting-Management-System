import { createContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { get } from "../utils/http";

const AppContext = createContext();

const AppProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [authUser, setAuthUser] = useState({});

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(async function () {
			try {
				let token = await SecureStore.getItemAsync("token");
				if (token) {
					let user = await get("api/auth/profile", {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});

					setAuthUser(user.data);
					setIsLoggedIn(true);
				} else {
					setIsLoggedIn(false);
					setAuthUser({});
				}
				setIsLoading(false);
			} catch (error) {
				setIsLoggedIn(false);
				setAuthUser({});
				setIsLoading(false);
			}
		})();
	}, []);

	return (
		<AppContext.Provider
			value={{
				isLoggedIn,
				setIsLoggedIn,
				authUser,
				setAuthUser,
				isLoading,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export { AppContext, AppProvider };
