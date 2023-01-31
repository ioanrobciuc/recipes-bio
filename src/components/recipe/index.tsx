import './style.css'

import { Link } from 'react-router-dom'

export interface RecipeProps {
  title: string
  photoUri: string
  to?: string
  description?: string
  ingredients?: string
}

const Recipe = ({ title, photoUri, to, description, ingredients }: RecipeProps) => {
  const composeTitle = title !== '' ? title : 'undefined'

  return (
    <div className="recipe">
      {
        typeof to !== 'undefined' ? (
          <h2>
            <Link to={to} title={composeTitle}>{composeTitle}</Link>
          </h2>
        ) : (
          <h1>{composeTitle}</h1>
        )
      }
      {
        photoUri !== '' && <img src={photoUri} alt={composeTitle} />
      }
      {
        typeof description !== 'undefined' && description !== '' && <p>{description}</p>
      }
      {
        typeof ingredients !== 'undefined' && ingredients !== '' && <p>{`Ingredients: ${ingredients}`}</p>
      }
    </div>
  )
}

export default Recipe
