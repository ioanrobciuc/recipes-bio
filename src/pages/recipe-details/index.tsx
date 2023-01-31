import './style.css'

import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import Recipe from '../../components/recipe'
import Button from '../../components/button'
import Popup from '../../components/popup'
import { useCRUD } from '../../hooks'

const ReceipeDetails = () => {
  const titleRef = useRef<HTMLInputElement>(null)
  const photoUriRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const ingredientsRef = useRef<HTMLInputElement>(null)

  const [showPopup, setShowPopup] = useState<boolean>(false)

  const { readRecipe, updateRecipe, deleteRecipe, recipe } = useCRUD()
  const { uuid } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (typeof uuid !== 'undefined' && typeof recipe === 'undefined') {
      readRecipe(uuid)
    }
  }, [readRecipe, recipe, uuid])

  useEffect(() => {
    if (typeof recipe !== 'undefined') {
      if (titleRef.current !== null) {
        titleRef.current.value = recipe.title
      }

      if (photoUriRef.current !== null) {
        photoUriRef.current.value = recipe.photoUri
      }

      if (descriptionRef.current !== null) {
        descriptionRef.current.value = recipe.description
      }

      if (ingredientsRef.current !== null) {
        ingredientsRef.current.value = recipe.ingredients
      }
    }
  }, [showPopup, recipe])

  const handleOnDelete = () => {
    if (typeof uuid !== 'undefined') {
      deleteRecipe(uuid)
      navigate('/')
    }
  }

  const handleOnUpdate = () => {
    if (typeof uuid !== 'undefined') {
      updateRecipe({
        title: titleRef.current?.value ?? '',
        uuid: uuid,
        photoUri: photoUriRef.current?.value ?? '',
        description: descriptionRef.current?.value ?? '',
        ingredients: ingredientsRef.current?.value ?? ''
      })

      setShowPopup(!showPopup)
    }
  }

  if (typeof recipe === 'undefined') {
    return null
  }

  return (
    <div id="recipe-details">
      <div className="container">
        <div className="buttons">
          <Button color="blue" onClick={() => setShowPopup(!showPopup)}>Edit</Button>
          <Button color="red" onClick={() => handleOnDelete()}>Delete</Button>
        </div>
        <Recipe
          title={recipe.title}
          photoUri={recipe.photoUri}
          description={recipe.description}
          ingredients={recipe.ingredients}
        />
      </div>
      <Popup
        show={showPopup}
        onClickClose={() => setShowPopup(!showPopup)}
      >
        <input ref={titleRef} type="text" placeholder="Title" />
        <input ref={photoUriRef} type="text" placeholder="Photo URI" style={{marginTop: '25px'}} />
        <textarea ref={descriptionRef} placeholder="Description" style={{marginTop: '25px'}}></textarea>
        <input ref={ingredientsRef} type="text" placeholder="Ingredients" style={{marginTop: '25px'}} />
        <Button color="green" onClick={() => handleOnUpdate()} style={{marginTop: '25px'}}>Update</Button>
      </Popup>
    </div>
  )
}

export default ReceipeDetails
