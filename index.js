const consumoApi = require('./consumoApi')
const enviarCorreo = require('./mailer.js')

const http = require('http')
const fs = require('fs')


const servidor = http
    .createServer(async (req, res) => {
        let { usuarios } = JSON.parse(fs.readFileSync('usuarios.json', 'utf8'))
        if (req.url == "/" && req.method == "GET") {
            res.writeHeader(200, { 'content-type': 'text/html' })
            const leerIndex = fs.readFileSync('index.html', 'utf8')
            res.end(leerIndex)
        }
        if (req.url == "/usuario" && req.method == "POST") {
            let guardarUsuarios = await consumoApi()
            usuarios.push(guardarUsuarios)
            fs.writeFileSync('usuarios.json', JSON.stringify({ usuarios }))
            res.end(JSON.stringify('usuarios.json'))
        }
        if (req.url == "/usuarios" && req.method == "GET") {
            const mostrarUsuarios =fs.readFileSync('usuarios.json', 'utf8')
            res.end(mostrarUsuarios)
        }
        if (req.url == '/premio' && req.method == "GET") {
            const miPremio = fs.readFileSync('premio.json', 'utf8')
            res.end(miPremio)
        }
        if (req.url == '/premio' && req.method == "PUT") {
            let modificarPremio;
            req.on("data", (payload) => {
                modificarPremio = JSON.parse(payload)
            });
            req.on('end', () => {
                fs.writeFileSync('premio.json', JSON.stringify(modificarPremio))
                res.end("premio")
            })
        }
        if (req.url == '/ganador' && req.method == "GET") {
            const ganador = Math.floor(Math.random() * usuarios.length);
            const lugarDelGanador = usuarios[ganador];
            console.log(lugarDelGanador)
            const text = `El ganador de este concurso fue ${lugarDelGanador.nombre} felicidadeeesss!!!!`;
            await enviarCorreo("nodemailerADL@gmail.com", "javy.molinet@gmail.com", text)



            res.end(JSON.stringify(lugarDelGanador))
        }

    })
    .listen(3000)