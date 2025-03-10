import { useContext } from "react";
import { View, Text, Button, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigation/RootNavigation";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamsList, "Home">

interface HomeScreenProps {
    navigation: HomeScreenNavigationProp
}

const HomeScreen : React.FC<HomeScreenProps> = ({navigation}) => {

    const {signOut}  = useContext(AuthContext);

    const handleLogout =()=> {
        Alert.alert('Logout', 'Are you sure to logout', [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Logout',
                onPress: async()=> {
                    await signOut();
                    navigation.replace('Login');
                }
            }
        ])
    }

    return <View>
        <Text>Home Screen</Text>
        <Button title='logout' onPress={handleLogout}/>
    </View>
}

export default HomeScreen;
