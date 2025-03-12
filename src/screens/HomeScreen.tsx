import { useContext, useEffect, useState } from "react";
import { View, Text, Button, Alert, StyleSheet, TouchableOpacity, Modal, FlatList , TextInput} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigation/RootNavigation";
import CreateRecipeForm from "../components/CreateRecipeForm";
import { Recipe, RecipeContext } from "../context/RecipeContext";
import RecipeItem from "../components/RecipeItem";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamsList, "Home">

interface HomeScreenProps {
    navigation: HomeScreenNavigationProp
}

const HomeScreen : React.FC<HomeScreenProps> = ({navigation}) => {

    const {signOut, userId}  = useContext(AuthContext);
    const {createRecipe, fetchRecipes, recipes, deleteRecipe} = useContext(RecipeContext)
    const [showModal,setShowModal] = useState(false); 
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(()=> {
            fetchRecipes()
    },[])


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

    const handleOnCreateRecipeButtonSubmit = async(newRecipe: Omit<Recipe, '_id' | 'createdBy' | 'createdAt'>)=> {
        console.log(newRecipe);
        createRecipe(newRecipe);
        setShowModal(false);
    }

    const handleDeleteRecipe =async(currentRecipeId: string)=> {
        await deleteRecipe(currentRecipeId);
        await fetchRecipes();
    }

    const filteredRecipes = recipes?.filter(recipeItem => recipeItem.title.toLowerCase().includes(searchQuery.toLowerCase()))
    console.log(filteredRecipes)
    return <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TextInput style={styles.searchInput} value={searchQuery} onChangeText={setSearchQuery} placeholder="Search Recipes ..."/> 
                <TouchableOpacity style={styles.iconBtn} onPress={()=> setShowModal(true)}>
                    <Text style={styles.iconBtnTxt}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                    <Text style={styles.logoutBtnTxt}>Logout</Text>
                </TouchableOpacity>
            </View>
            {/* List of recipes */}
            <FlatList 
              data={filteredRecipes}
              renderItem={(item)=> 
                <RecipeItem
                 recipe={item} 
                 currentUserId={userId}
                 onRecipeItemDelete={()=> handleDeleteRecipe(item._id)}
                 onPressRecipeItem={()=> navigation.navigate('RecipeDetails', {recipeId: item._id})}
                />}
              
            />
            {/* Modal to add Recipe */}
            <Modal
              visible={showModal} 
              animationType="slide" 
              onRequestClose={()=> setShowModal(false)}
            >
                <CreateRecipeForm onSubmit={handleOnCreateRecipeButtonSubmit} onCancel={()=> setShowModal(false)}/>
            </Modal>
        </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        color: '#f5f5f5',
    }, 
    header: {
        flexDirection: 'row', 
        padding: 16, 
        alignItems: 'center', 
        backgroundColor: '#007aff'
    }, 
    searchInput :{
        flex: 1, 
        height: 45, 
        backgroundColor:  '#ffffff', 
        borderRadius: 20, 
        paddingHorizontal: 16, 
        marginRight: 15
    }, 
    iconBtn: {
        width: 35, 
        height: 35, 
        borderRadius: 20, 
        backgroundColor: ' #fff', 
        justifyContent: 'center', 
        alignItems: 'center'
    }, 
    iconBtnTxt: {
        fontSize: 20, 
        color: '#007aff',
    },
    logoutBtn: {
        backgroundColor: '#0b0c0a', 
        padding: 12, 
        marginLeft: 24, 
        borderRadius: 24
    }, 
    logoutBtnTxt: {
        fontSize: 14, 
        fontWeight: 'bold', 
        color: '#ffffff'
    }
})

export default HomeScreen;
