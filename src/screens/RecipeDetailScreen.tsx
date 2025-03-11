import { View, Text, ScrollView, StyleSheet } from "react-native";
import { RootStackParamsList } from "../navigation/RootNavigation";
import { RouteProp } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Recipe, RecipeContext } from "../context/RecipeContext";


type RecipeDetailsScreenRouteProp = RouteProp<RootStackParamsList, 'RecipeDetail'>  

interface RecipeDetailScreenProps {
    route: RecipeDetailsScreenRouteProp
}



const RecipeDetailScreen : React.FC<RecipeDetailScreenProps> = ({route}) => {

    const [recipeDetails, setRecipeDetails] = useState<Recipe | null>(null);
    const {recipeId} = route.params; 
    const {fetchSingleRecipe} = useContext(RecipeContext); 

    useEffect(()=> {
        (async function(){
            const recipeData =await fetchSingleRecipe(recipeId);
            setRecipeDetails(recipeData)
        })()
    })

    if(!recipeDetails){
        return <View>
            <Text>Loading ...</Text>
        </View>
    }

    return <ScrollView style={styles.container}>
        <Text style={styles.title}>{recipeDetails.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{recipeDetails.description}</Text>
        <Text style={styles.difficulty} numberOfLines={2}>{recipeDetails.difficulty}</Text>
    </ScrollView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 16
    },
     title: {
        fontSize: 18, 
        fontWeight: 'bold',
        marginBottom: 8
    }, 
    description: {
        fontSize: 15, 
        color: '#666', 
        marginBottom: 10
    }, 
    difficulty: {
        fontSize: 12, 
        color: '#007afd', 
        fontWeight:'bold'
    },
})

export default RecipeDetailScreen;