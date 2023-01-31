import './style.css'

import { useState, useRef } from 'react'

import Receipe from '../../components/recipe'
import Button from '../../components/button'
import Popup from '../../components/popup'
import { useCRUD } from '../../hooks'

const Home = () => {
  const titleRef = useRef<HTMLInputElement>(null)
  const photoUriRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const ingredientsRef = useRef<HTMLInputElement>(null)

  const [showPopup, setShowPopup] = useState<boolean>(false)

  const { createRecipe, recipes } = useCRUD()

  const handleOnCreate = () => {
    createRecipe(
      titleRef.current?.value ?? '',
      photoUriRef.current?.value ?? '',
      descriptionRef.current?.value ?? '',
      ingredientsRef.current?.value ?? ''
    )

    setShowPopup(!showPopup)
  }

  return (
    <div id="home">
      <div className="container">
        <Button color="green" onClick={() => setShowPopup(!showPopup)}>Add new recipe</Button>
        {
          recipes.map((recipe, index) => {
            return (
              <Receipe
                key={`recipe-${index}`}
                title={recipe.title}
                photoUri={recipe.photoUri}
                to={`/${recipe.uuid}/`}
              />
            )
          })
        }
      </div>
      <Popup
        show={showPopup}
        onClickClose={() => setShowPopup(!showPopup)}
      >
        <input ref={titleRef} type="text" placeholder="Title" />
        <input ref={photoUriRef} type="text" placeholder="Photo URI" style={{marginTop: '25px'}} />
        <textarea ref={descriptionRef} placeholder="Description" style={{marginTop: '25px'}}></textarea>
        <input ref={ingredientsRef} type="text" placeholder="Ingredients" style={{marginTop: '25px'}} />
        <Button color="green" onClick={() => handleOnCreate()} style={{marginTop: '25px'}}>Create</Button>
      </Popup>
    </div>
  )
}

export default Home
