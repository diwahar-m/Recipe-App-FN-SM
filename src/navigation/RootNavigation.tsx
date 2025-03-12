

import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import RecipeDetailScreen from "../screens/RecipeDetailScreen";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import HomeScreen from "../screens/HomeScreen";

export type RootStackParamsList = {
    Login : undefined,
    Signup: undefined,
    Home: undefined,  
    RecipeDetail: {recipeId: string}
}

const Stack = createNativeStackNavigator<RootStackParamsList>()
type NavigationProp = NativeStackNavigationProp<RootStackParamsList> 



const RootNavigation : React.FC = () => {

    const navigation = useNavigation<NavigationProp>()
    const{isAuthenticated, isLoading} = useContext(AuthContext);


    useEffect(()=> {
        if(!isLoading){  
            if(isAuthenticated) {
                navigation.reset({
                    index: 0, 
                    routes: [{name: 'Home'}]
                })
            } else {
                navigation.reset({
                    index: 0, 
                    routes: [{name: 'Login'}]
                })
            }
        }

    },[isLoading, isAuthenticated, navigation])

    return <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: false}}/>
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
}

export default RootNavigation