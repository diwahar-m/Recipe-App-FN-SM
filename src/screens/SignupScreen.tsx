import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from "react-native";
import { RootStackParamsList } from "../navigation/RootNavigation";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

type SignUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamsList, "Signup">

interface SignUpScreenProps {
    navigation: SignUpScreenNavigationProp
}

const SignupScreen : React.FC<SignUpScreenProps> = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword]  = useState('');

    const {signUp} = useContext(AuthContext)


    const handleSignUp= async()=> {
        if(email && password){
            const success = await signUp(email, password)
            if(success){
                // 
                Alert.alert('Success', 'Account created successfully !, please login')
            }else{
                 Alert.alert('Sign up failed', 'Please try again with a different email')
            }
        }else {
            Alert.alert('Invalid input', 'Please try both email & password')
        }
    }



    return <View style={styles.container}>
        <Text style={styles.headerText}>Signup Screen</Text>
        <TextInput 
          placeholder="Email" 
          keyboardType="email-address" 
          autoCapitalize="none"  
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.btn} onPress={handleSignUp}>
            <Text style={styles.btnTxt}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
            <Text style={styles.linkTxt}>Already have an account? Login</Text>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    }, 
    headerText: {
        fontSize: 24,
        marginBottom: 20, 
        fontWeight: 'bold'
    },
    input: {
        width:'100%',
        height : 45,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 6 ,
        paddingHorizontal: 10,
        marginBottom: 10
    },
    btn : {
        width: '100%', 
        height: 40,
        backgroundColor: '#056edd',
        justifyContent: 'center', 
        alignItems:'center', 
        borderRadius: 5,
        marginTop: 10,

    }, 
    btnTxt: {
        color: '#fff',
        fontSize: 16, 
        fontWeight: 'bold'
    },
    linkTxt: {
        marginTop: 16, 
        color: '#007aff',
    }
})

export default SignupScreen;