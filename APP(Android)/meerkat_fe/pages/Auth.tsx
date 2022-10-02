// core
import { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Image, ScrollView, KeyboardAvoidingView} from "react-native";
// types and comps
import Login from "./Login";
import Register from "./Register";
import ForgotPw from "./ForgotPw";
import { LoginContext } from "../common/Context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
// assets
const logo = require("../assets/logos/meerkat_black.png");

type AuthProps = NativeStackScreenProps<RootStackParamList, "Auth">;

export default function Auth(props: AuthProps) {
    const { navigation } = props;
    const { refreshLoginToken, isNotLoggedIn } = useContext(LoginContext);
    const [currPage, setCurrPage] = useState<string>("");

    useEffect(() => {
        if (!isNotLoggedIn) navigation.navigate('Home')
    }, [isNotLoggedIn])

    const showAuthComps = () => {
        switch (currPage) {
            case "register":
                return <Register setCurrPage={setCurrPage} />;
            case "forgotPw":
                return <ForgotPw setCurrPage={setCurrPage} />;
            default:
                return (
                    <Login
                        setCurrPage={setCurrPage}
                        refreshLoginToken={refreshLoginToken}
                    />
                );
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo} />
                </View>
                {showAuthComps()}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,
        alignItems: "center",
    },
    logoContainer: {
        height: 60,
    },

    logo: {
        width: 40,
        height: 40,
    },
});