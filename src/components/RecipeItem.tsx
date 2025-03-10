import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Recipe } from "../context/RecipeContext"


interface RecipeProps {
    recipe: Recipe
}


const RecipeItem: React.FC<RecipeProps> = ({recipe}) => {
    console.log(recipe);

    return <TouchableOpacity style={styles.card}>
        <View  style={styles.cardContent}>
            <Text style={styles.title}>{recipe.title}</Text>
            <Text style={styles.description} numberOfLines={2}>{recipe.description}</Text>
            <Text style={styles.difficulty} numberOfLines={2}>{recipe.difficulty}</Text>
        </View>
        <TouchableOpacity style={styles.deleteBtn}> 
            <Text style={styles.deleteBtnTxt}>Delete</Text>
        </TouchableOpacity>

    </TouchableOpacity>


}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff', 
        borderRadius: 8, 
        padding: 16, 
        marginHorizontal: 16, 
        marginVertical: 8, 
        shadowColor: '#000', 
        shadowOffset: {
            width: 0, 
            height: 2
        }, 
        shadowOpacity: 0.1, 
        shadowRadius: 4, 
        elevation: 5
    }, 
    cardContent: {
        flex: 1,
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
    deleteBtn: {
        position: 'absolute', 
        top: 35, 
        right: 10, 
        backgroundColor: '#070706', 
        paddingHorizontal: 16, 
        paddingVertical: 8, 
        borderRadius: 4
    }, 
    deleteBtnTxt: {
        color: '#ffffff', 
        fontWeight: 'bold', 
        fontSize: 14
    }
})

export default RecipeItem