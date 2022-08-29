import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getFilteredCategory} from "../api";
import Preloader from "../components/Preloader";
import MealList from "../components/MealList";

const Category = () => {
    const {name} = useParams()
    const [meals, setMeals] =useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getFilteredCategory(name).then(data => setMeals(data.meals))
    }, [name])

    return (
        <>
            <button className='btn' onClick={() => navigate(-1)}>Go back</button>
            <div>
                {!meals.length ? <Preloader/> : <MealList meals={meals}/>}
            </div>
        </>

    );
};

export default Category;