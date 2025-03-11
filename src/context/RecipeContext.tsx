import { createContext, ReactNode, useContext, useState } from "react"
import { API_URL, AuthContext } from "./AuthContext"
import axios from "axios"

export interface Recipe {
    _id: string
    title: string
    description: string
    difficulty: 'Easy' | 'Medium' | 'Hard'
    createdBy: string
    createdAt: string
}

interface RecipeContextData {
    recipes?: Recipe[], 
    createRecipe?: (recipe: Omit<Recipe, '_id' | 'createdBy' | 'createdAt'>)=> Promise<void>
    fetchRecipes: ()=> Promise<void>
    fetchSingleRecipe: (id:string)=> Promise<Recipe>
    deleteRecipe: (id:string)=> Promise<void>
} 

export const RecipeContext = createContext<RecipeContextData>({} as RecipeContextData) 


export const RecipeProvider : React.FC<{children: ReactNode}> = ({children}) => {

    const [recipes, setRecipes] = useState<Recipe[]>([])
    const {token} = useContext(AuthContext)

    const fetchRecipes = async() => {
        try {
            const result = await axios.get(`${API_URL}/api/recipe/get`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setRecipes(result?.data)

        } catch(err) {
            console.log(err)
        }
    }

    const createRecipe  = async(recipe: Omit<Recipe, '_id' | 'createdBy' | 'createdAt'>) => {
        try {
            const result = await axios.post(`${API_URL}/api/recipe`, recipe, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }); 

            if(result?.data?.success) setRecipes([...recipes, result.data.data])


        } catch(err) {
            console.log(err);
        }
    }

    const fetchSingleRecipe = async(id:string): Promise<Recipe> => {
        try {
            const result = await axios.get(`${API_URL}/api/recipe/get/:${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            } )

            return result.data.data
        } catch(err) {
            console.log(err);
            throw err
        }
    }

    const deleteRecipe =async(id: string): Promise<void> => {
        try {
            const result = await axios.delete(`${API_URL}/api/recipe/delete/:${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            } )

            return null
        } catch(err) {
            console.log(err);
            throw err
        }
    }



    return <RecipeContext.Provider value={{recipes, createRecipe, fetchRecipes, fetchSingleRecipe, deleteRecipe}}>{children}</RecipeContext.Provider>
}
