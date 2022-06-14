import React from "react"

export const Order = (props) => {

return (

 <div className="order">
        <h3>{props.name}</h3>
        <ul className="ingredient-list">
          {props.ingredients.map(ingredient => {
            return <li key={ingredient + Date.now()}>{ingredient}</li>
          })}
        </ul>
      </div>
)
}