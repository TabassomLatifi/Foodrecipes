import './App.css';
import { myAppId, myAppKey} from './key.js';
import Axios from 'axios';
import { useState } from 'react';
import RecipeTile from "./RecipeTile.js";
import { Helmet } from 'react-helmet';

function App() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [healthLabels, sethealthLabels] = useState('vegan');

  let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${myAppId}&app_key=${myAppKey}&healthLabels=${healthLabels}`;
  
  const getRecipes = async () => {
    const result = await Axios.get(url);
    setRecipes(result.data.hits);
    console.log(result.data.hits);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipes();
  }

  return (
    <div className='app'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Food Recipes</title>
        <meta name='description' content='a website for finding recipes based on the ingredient you have' />
      </Helmet>
      <h1 className='app__header'>Find Recipes For Your Ingredients</h1>
      <form className='app__searchForm' onSubmit={onSubmit}>
        <input 
          type='text' 
          className='app__input'
          placeholder='Enter an ingredient' 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} />

        <input
          type='submit'
          className='app__submit'
          value='Search' />

      </form>
      <h3 className='app__header2'>Your Search Results:</h3>
      <div className='app__recipes'>
        {recipes !== [] && 
          recipes.map((recipe) => {
            return <RecipeTile recipe={recipe} />;
        })}
      </div>
    </div>
  );
}

export default App;
