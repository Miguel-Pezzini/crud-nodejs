import http from 'node:http';

import { json } from './middlewares/json.js';
import { routes } from '../src/routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';

const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    await json(req, res);
    
    const findRoutes = routes.find(route => {
        console.log(route)
        return route.method === method && route.path.test(url);
    })
    
    if(findRoutes) {
        const routeParams = req.url.match(findRoutes.path);

        console.log(routeParams.groups);

        // console.log(extractQueryParams(routeParams.groups.query))
        const { query, ...params } = routeParams.groups;

        req.params = params;
        req.query = query ? extractQueryParams(query) : {};


        return findRoutes.handler(req, res);
    }

    return res.writeHead(404).end()
})

server.listen(3330);