import server from './server'
import 'dotenv/config'
import colors from 'colors'

const PORT = process.env.PORT || 4800

server.listen(PORT, () => {
    console.log(colors.cyan.bold(`REST API corriendo el el puero ${PORT}`))
})
