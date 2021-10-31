const http = require('http')
const DEFAULT_USER = { username: "Barreto", password: "123" }

const routes = {
    '/login:post' : async (request, response) => {
        for await (const data of request) {
            const user = JSON.parse(data)
            if (user.username !== DEFAULT_USER.username || user.password !== DEFAULT_USER.password) {
                response.writeHead(401)
                response.write("Unauthorized")
                return response.end()
            }
            response.write('Logging has succeeded!')
            response.end()
        }
    },
    '/contact:get' : (request, response) => {
        response.write('contact us page')
        return response.end()
    },
    default: (request, response) => {
        response.write('Hello World!')
        return response.end()
    }
}

const handler = function (request, response) {
    const { url, method } = request
    const routeKey = `${url}:${method.toLowerCase()}`
    if (routeKey === null) {
        return
    }
    const chosen = routes[routeKey] || routes.default
    response.writeHead(200, {
        'Content-Type': 'text/html'
    })

    return chosen(request, response)
}

const app = http.createServer(handler).listen(3000, () => console.log('app running at', 3000))

module.exports = app