// core
import { useCallback, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
// comps
import ChatRoom from "./pages/ChatRoom";
import Auth from "./pages/Auth";
import { LoginContext } from "./common/Context";
// hooks
import useLoginCheck from "./hooks/useLoginCheck";
// nav
import { NavigationContainer, DefaultTheme, createNavigationContainerRef } from "@react-navigation/native";
import { RootStackParamList } from "./common/types";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./pages/Main";
import MyProfile from "./pages/SettingsPages/MyProfile";
import ChangePw from "./pages/SettingsPages/ChangePw";
import AddChatRoom from "./pages/ChatRoomList/AddChatRoom";


// nav
const Stack = createStackNavigator<RootStackParamList>();
const navigationRef = createNavigationContainerRef<RootStackParamList>() // need to use composite list for tab usage

// keep the splash screen
SplashScreen.preventAutoHideAsync();

export default function App() {
    const [fontsLoaded] = useFonts({
        "noto-black": require("./assets/fonts/NotoSansKR-Black.otf"),
        "noto-bold": require("./assets/fonts/NotoSansKR-Bold.otf"),
        "noto-light": require("./assets/fonts/NotoSansKR-Light.otf"),
        "noto-med": require("./assets/fonts/NotoSansKR-Medium.otf"),
        "noto-reg": require("./assets/fonts/NotoSansKR-Regular.otf"),
        "noto-thin": require("./assets/fonts/NotoSansKR-Thin.otf"),
    });

    // login token hook
    const { checkIfLoggedIn, isLoginLoading, isNotLoggedIn } =
        useLoginCheck();

    // splash hide callback
    const hideSplash = useCallback(async () => {
        if (!isLoginLoading && fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [isLoginLoading, fontsLoaded]);

    useEffect(() => {
        if (isNotLoggedIn && navigationRef.isReady()) {
            navigationRef.navigate("Auth"); // if not logged in, send user to login screen
    }
    }, [navigationRef.current])

    if (isLoginLoading || !fontsLoaded) return null;
    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={hideSplash}
            theme={{
                ...DefaultTheme,
                colors: { ...DefaultTheme.colors, background: "white" },
            }}
        >
            <LoginContext.Provider
                value={{
                    checkIfLoggedIn: checkIfLoggedIn,
                    isNotLoggedIn: isNotLoggedIn,
                }}
            >
                <Stack.Navigator initialRouteName="Auth">
                    <Stack.Screen
                        name="Auth"
                        component={Auth}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Main"
                        component={Main}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Chat"
                        component={ChatRoom}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="MyProfile"
                        component={MyProfile}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="ChangePw"
                        component={ChangePw}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="AddChatRoom"
                        component={AddChatRoom}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </LoginContext.Provider>
        </NavigationContainer>
    );
}
