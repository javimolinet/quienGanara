const axios = require('axios')
const { v4: uuidv4 } = require('uuid')


const getApi = async () => {
    const { data } = await axios.get('https://randomuser.me/api')
    data.results[0]


    let datosApi = data.results[0]
    let datosUsuario = {
        id: uuidv4().slice(0,6),
        correo: datosApi.email,
        nombre: `${datosApi.name.first} ${datosApi.name.last}`,
        pais: datosApi.location.country,
        foto: datosApi.picture.thumbnail

    }

    return datosUsuario
}
module.exports = getApi