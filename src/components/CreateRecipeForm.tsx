import { Picker } from "@react-native-picker/picker"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"


interface CreateRecipeFormProps {
    onCancel: ()=> void
}

const CreateRecipeForm : React.FC<CreateRecipeFormProps> = ({onCancel})=> {

    return <View style={styles.container}>
            <Text style={styles.title}>Create New Recipe</Text>
            <TextInput style={styles.input} placeholder="Recipe Title"/>
            <TextInput style={[styles.input, styles.textArea]} placeholder="Recipe Description"/>
            <View style={styles.pickerContainer}>
                <Text style= {styles.label}>Difficulty</Text>
                <Picker style={styles.picker}>
                    <Picker.Item label="Easy" value={'Easy'}/>
                    <Picker.Item label="Medium" value={'Medium'}/>
                    <Picker.Item label="Hard" value={'Hard'}/>
                </Picker>
            </View>
            <View  style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.cancelBtn]} onPress={onCancel}>
                    <Text style={styles.btnTxt}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.submitBtn]}>
                    <Text style={styles.btnTxt}>Create Recipe</Text>
                </TouchableOpacity>

            </View>

      </View>
}


const styles= StyleSheet.create({
    container: {
        flex: 1, 
        padding: 16, 
        backgroundColor: '#ffffff'
    }, 
    title: {
        fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom : 16

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
    pickerContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 16
    },
    label: {
        fontSize: 16, 
        marginBottom: 8
    },
    buttonContainer: {
        flexDirection : 'row', 
        justifyContent: 'space-between'
    }, 
    button: {
        flex:1, 
        padding: 16, 
        borderRadius: 4, 
        alignItems: 'center',
    }, 
    cancelBtn: {
        backgroundColor: '#ccc'

    }, 
    submitBtn: {
         backgroundColor: '#007aff'
    }, 
    btnTxt:{
        color: '#ffffff', 
        fontSize: 16, 
        fontWeight: 'bold'

    }, 
    picker: {
        flex: 1, 
        height: 50
    }, 
    textArea: {
        height: 100, 
        textAlignVertical: 'top'
    }
})


export default CreateRecipeForm