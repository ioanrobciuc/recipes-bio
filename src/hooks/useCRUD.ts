import { useState, useEffect } from 'react'

export interface Recipe {
  uuid: string
  title: string
  photoUri: string
  description: string
  ingredients: string
}

const RECIPES = 'recipes'

const useCRUD = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined)

  useEffect(() => {
    const lsRecipes = localStorage.getItem(RECIPES)

    if (lsRecipes !== null) {
      const recipesParsed = JSON.parse(lsRecipes)
      setRecipes(recipesParsed)
    }
  }, [])

  const createRecipe = (title: string, photoUri: string, description: string, ingredients: string) => {
    const newList = [{ uuid: Date.now().toString(), title, photoUri, description, ingredients }, ...recipes]

    setRecipes(newList)
    localStorage.setItem(RECIPES, JSON.stringify(newList))
  }

  const readRecipe = (uuid: string) => {
    setRecipe(recipes.find(recipe => recipe.uuid === uuid))
  }

  const updateRecipe = (recipeUpdated: Recipe) => {
    const newList: Recipe[] = recipes

    for (let i = 0; i < newList.length; i++) {
      if (newList[i].uuid === recipeUpdated.uuid) {
        newList[i] = recipeUpdated
      }
    }

    setRecipe(recipeUpdated)
    localStorage.setItem(RECIPES, JSON.stringify(newList))
  }

  const deleteRecipe = (uuid: string) => {
    const newList = recipes.filter(recipe => recipe.uuid !== uuid)

    setRecipes(newList)
    localStorage.setItem(RECIPES, JSON.stringify(newList))
  }

  return { createRecipe, readRecipe, updateRecipe, deleteRecipe, recipes, recipe }
}

export default useCRUD
