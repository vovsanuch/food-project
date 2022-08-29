import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getMealById} from "../api";
import Preloader from "../components/Preloader";

const Recipe = () => {
    const {id} = useParams()
    const [recipe, setRecipe] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getMealById(id).then(data => setRecipe(data.meals[0]))
    }, [id])

    return (
        <>
            <div>
                {!recipe.idMeal ? <Preloader/> : (
                    <div className='recipe'>
                        <img src={recipe.strMealThumb} alt={recipe.strMeal}/>
                        <h1>{recipe.strMeal}</h1>
                        <h6>Category: {recipe.strCategory}</h6>
                        {recipe.strArea ? <h6>Area: {recipe.strArea}</h6> : null}
                        <p>{recipe.strInstructions}</p>

                        <table className='centered'>
                            <thead>
                            <tr>
                                <th>Ingredient</th>
                                <th>Measure</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                Object.keys(recipe).map(key => {
                                    if (key.includes('Ingredient') && recipe[key]) {
                                        return (
                                            <tr key={key}>
                                                <td>{recipe[key]}</td>
                                                <td>{recipe[key.replace('Ingredient', 'Measure')]}</td>
                                            </tr>
                                        );
                                    }
                                    return null
                                })
                            }
                            </tbody>
                        </table>

                        {recipe.strYoutube ? (
                            <div className="row">
                                <h5 style={{margin: '2rem 0 1.5rem'}}>Video Recipe</h5>
                                {/*<iframe*/}
                                {/*    title={id}*/}
                                {/*    src={`https://www.youtube.com/embed/${recipe.strYoutube.slice(-11)}`}*/}
                                {/*    allowFullScreen*/}
                                {/*/>*/}
                            </div>) : null}
                    </div>
                )}
            </div>
            <button className='btn' onClick={() => navigate(-1)}>Go back</button>
        </>

    );
};

export default Recipe;