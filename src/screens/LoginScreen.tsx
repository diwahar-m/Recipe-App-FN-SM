import { View, Text, Button } from "react-native";
import { RootStackParamsList } from "../navigation/RootNavigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


export type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamsList, "Login">


interface LoginScreenProps {
    navigation: LoginScreenNavigationProp
}

const LoginScreen : React.FC<LoginScreenProps> = ({navigation}) => {

    return <View>
        <Text>Login Screen</Text>
        <Button title="Go to sign Up" onPress={()=> navigation.navigate('Signup')}/>
    </View>

}

export default LoginScreen;