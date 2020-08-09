const express = require('express');
const app = express();
const axios = require ('axios');
const { response } = require('express');
// primero impots despues todo lo demas
const port = 8000

// 1.- Agrega un endpoint '/api/' que responda a 
//         una petición de tipo GET con un código de estado 200 
//         y el siguiente json: 
//                     {'mensaje':'hola mundo'}

// http://localhost:8000/api

app.get('/api', (request, response)=>{
    response.status(200).json({'mensaje':'Hola Mundo!'})
})

// 2.- Agrega un endpoint '/api/suma' que responda a una 
// petición de tipo GET con la suma de dos números que 
// reciba mediante las querys num1 y num2. El servidor
// debe responder con un código de estado 200 y un json 
// como el siguiente:
//                 {'resultado': 7}

// http://localhost:8000/api/suma?sum1=3&sum2=5

app.get('/api/suma', (request, response)=>{
    const { sum1, sum2 } = request.query;
    const a = parseInt(sum1)
    const b = parseInt(sum2)
    const c = a+b
    response.status(200).json({'resultado':`El resultado es ${c}`})
})

// 3.- Agrega un endpoint '/api/usuario/' que responda a
// una petición de tipo GET con el nombre que sea 
// recibido a través de params. El servidor debe responder
// con un código de estado 200 y un json como este:
//               {'usuario': 'Edwin'}

// http://localhost:8000/api/Jacobo

app.get('/api/:name', (request, response)=>{
    const { name } = request.params;
    response.status(200).json({'usuario': name })
})

//  4.- Agrega un endpoint '/api/swapi' que responda a una
// petición de tipo GET con el personaje solicitado de 
// https://swapi.dev/
// El cliente debe mandar el número de personaje mediante
// params. La respuesta del servidor debe lucir algo así
// {'personaje': {
// 'name': 'Luke Skywalker',
// ...,
// }}


// http://localhost:8000/api/swapi/1

app.get('/api/swapi/:id', (request, response)=>{
    const { id } = request.params;
    const URL =`https://swapi.dev/api/people/${id}/`

    axios.get(URL)
    .then((res)=>{
        const {name, height} = res.data // esto es en lugar de hacer varias let o var
        response.status(200).json({
            personaje:{
            'Character': name, 
            'Height': height
            }
})
       })
    .catch((error)=>{
        response.status(500).json({'error': 'Tuvimos un error, regresa despues'
        })
    }) 
    
})



app.listen(port,()=>{
    console.log(`Server listening in port ${port}`)
})


