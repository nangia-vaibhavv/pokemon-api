import React,{useState,useEffect} from 'react'
import './App.css';
import {getAllPokemon, getPokemon} from './pokemon';
import Card from './components/Card';
import Navbar from './components/Navbar';

function App(){
const [pokemonData,setPokemonData] =useState([]);
const [nextUrl,setNextUrl] =useState('');
const [prevUrl,setPrevUrl] =useState('');

const [loading,setLoading]=useState(true);
//this is just initial url after this initial utl i will get end url from wheere data of ech pokemon eill be fetched
const initialUrl='https://pokeapi.co/api/v2/pokemon';
useEffect(()=>{
  //create async fucntionn called fetch data used to fetch pokemon from api
  async function fetchData(){
    let response=await getAllPokemon(initialUrl);
    
    setNextUrl(response.next);
    setPrevUrl(response.previous); 
    let pokemon =await loadingPokemon(response.results);
    console.log(pokemon);

      setLoading(false);  //as if promise returen then that means data is fetched
  }
  fetchData();
  },[])    //useeffect ki empty array ke parameters


  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }


  //button for next and prev page

//EXTRATING information about each pokemon through loadin pokemon funtion and above mension fetch data calls all hat functions
const loadingPokemon=async(data)=>{   //as data receives is not well synchronised

  //when calling fetch() with the await keyword, we're telling the async function to stop executing until the promise is resolved

  let _pokemonData=await Promise.all(data.map(async pokemon=>{
    let pokemonRecord=await getPokemon(pokemon.url);
    return pokemonRecord;
  })
  );
  setPokemonData(_pokemonData);
};

//showing all data through console.log 

console.log(pokemonData);
/*
  return ( <div>{loading ? <h1>Loading...</h1>:(<h1>Data is fetched</h1>  )} </div>);
}
*/

return (
  <div>
      {
        loading ? <h1>Loading...</h1> : (
        <>
        <Navbar />
        <div className="btn">
<button onClick={prev}>Previous page</button>
<button onClick={next}> Next page</button>
        </div>
          <div className="grid-container">
            {pokemonData.map((pokemon,i)=>{
            return <Card key={i} pokemon={pokemon}/>
          })}
  </div>
  </>
)
}
  </div>
  )
}


export default App
