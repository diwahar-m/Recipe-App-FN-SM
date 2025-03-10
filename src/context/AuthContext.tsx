import { createContext, ReactNode, useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";

export const API_URL = 'http://10.0.2.2:5000';
 
interface AuthContextData {
    token: string | null;
    isLoading: boolean;
    userId: string | null;
    signUp: (email: string, password: string) => Promise<boolean>;
    signIn: (email: string, password: string) => Promise<boolean>;
    signOut: () => Promise<void>;
    isAuthenticated: boolean;
    checkAuth: ()=> Promise<boolean>
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData) 

export const AuthProvider : React.FC<{children:  ReactNode}> = ({children}) => {
   
    const [token, setToken]  = useState<string | null>(null)
    const [userId, setUserId] = useState<string | null>(null)
    const [isLoading, seIsLoading]= useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    const checkAuth = async() => {
        try {
             const storedId = await AsyncStorage.getItem('userId');
            const storedToken = await AsyncStorage.getItem('token');

        if(storedId && storedToken) {
            setUserId(storedId);
            setToken(storedToken);
            setIsAuthenticated(true);

            return true;
        }
        return false
             
        } catch(err){
            console.log(err);
            return false;
        } finally {
            seIsLoading(false)
        }  
    }

    useEffect(()=> {
        checkAuth()
    })

    const signUp = async(email: string, password: string): Promise<boolean> => {
        console.log(email, password)
        try{
            const result = await axios.post(`${API_URL}/api/auth/register`, {email, password});
            console.log(result);
            if(result?.data?.success) return true;
            else return false;

        }catch(err){
            console.log(err);
            if(axios.isAxiosError(err)){
                console.log('Error Details', err?.response?.data)
            }
            return false;
        }
    }
    const signIn = async(email: string, password: string): Promise<boolean> => {
         try{
            const result = await axios.post(`${API_URL}/api/auth/login`, {email, password});
            const {token, userId, success} = result?.data;
            if(success){
                await AsyncStorage.setItem('token', token);
                setToken(token);
                await AsyncStorage.setItem('userId', userId);
                setUserId(userId);
                setIsAuthenticated(true);
                return true;
            } else return false

        }catch(err){
            console.log(err);
            if(axios.isAxiosError(err)){
                console.log('Error Details', err?.response?.data)
            }
            return false;
        }
    }
 
    const signOut = async(): Promise<void> => {
        try {
            await AsyncStorage.removeItem('userId');
            await AsyncStorage.removeItem('token');
            setUserId(null);
            setToken(null);
            setIsAuthenticated(false);

        } catch(err){
            console.log(err)
        }
    }

    if(isLoading)  return <ActivityIndicator  size={'large'} color={'red'}/>
    
    return <AuthContext.Provider value={{token, userId, isLoading, signUp, signIn, signOut, isAuthenticated, checkAuth}}>{children}</AuthContext.Provider>
}