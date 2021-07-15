export async function getAllPokemon(url){
    return new Promise((resolve,reject)=>{
       fetch(url)//if this task is resolved than it calls for .then
       .then(res=>res.json())  //as reault will be a json format
       //communicating with promices
       .then(data=>{
           resolve(data);
       })
    })
}

export async function getPokemon(url){
    return new Promise((resolve,reject)=>{
       fetch(url)//if this task is resolved than it calls for .then
       .then(res=>res.json())  //as reault will be a json format
       //communicating with promices
       .then(data=>{
           resolve(data);
       })
    })
}