import React, { useState, useEffect } from 'react';
import { postOrder } from '../../apiCalls';

const OrderForm = (props) => {
  const [name, setName] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [currentOrder, setCurrentOrder] = useState({})
  const [isDisabled, setIsDisabled] = useState(true)

  const handleIngredientChange = (e) => {
    e.preventDefault()
    const targetIngredient = e.target.name
    if(!ingredients.includes(targetIngredient)) {
      setIngredients(prevIngredients => [...prevIngredients, targetIngredient])
    } else {
      setIngredients(prevIngredients => {
        return prevIngredients.filter(ingredient => {
          return ingredient != targetIngredient
        })
      })
    }
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  const handleSubmit = e => {
    e.preventDefault();
    postOrder(currentOrder).then(data => {
      if(data.id) {
        console.log("Post Success:", data)
        props.handleNewOrder(data)
      clearInputs();
      }
    })
    
  }

  const clearInputs = () => {
    setName('')
    setIngredients([])
  }

  useEffect(() => {
    if (name && ingredients.length) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
    setCurrentOrder({name, ingredients})
  },[name, ingredients])

  useEffect(() => {
    console.log(ingredients)
  },[ingredients])

    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={name}
          onChange={e => handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { ingredients.join(', ') || 'Nothing selected' }</p>

        <button disabled={isDisabled} onClick={e => handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  
}

export default OrderForm;
