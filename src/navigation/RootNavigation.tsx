

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import RecipeDetailScreen from "../screens/RecipeDetailScreen";

export type RootStackParamsList = {
    Login : undefined,
    Signup: undefined,
    Home: undefined,
    RecipeDetail: {recipeId: string}
}

const Stack = createNativeStackNavigator<RootStackParamsList>()


const RootNavigation : React.FC = () => {

    return <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: true}}/>
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
}

export default RootNavigation