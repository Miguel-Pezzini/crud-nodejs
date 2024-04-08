import { randomUUID } from 'node:crypto';

import { Database } from './database.js';

import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database();

export const routes = [
    {
        method: "GET",
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const tasks = database.select("tasks");

            console.log(tasks);

            return res.writeHead(200).end(JSON.stringify(tasks));
        }
    },
    {
        method: "POST",
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body;

            const users = {
                id: randomUUID(),
                title: title,
                description: description,
                completed_at: null,
                created_at: Date.now(),
                updated_at: Date.now()
            }

            database.create("tasks", users)

            return res.writeHead(201).end()
        }
    },
    {
        method: "PUT",
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params;
            const { title, description } = req.body;
            const userUpdated = {
                title, 
                description
            }
            database.update("tasks", id, userUpdated)

            return res.writeHead(204).end();
        }
    },
    {
        method: "DELETE",
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params;
            database.delete('tasks', id);

            return res.writeHead(204).end();
        }

        
    },
    {
        method: "PATCH",
        path: buildRoutePath("/tasks/:id/complete"),
        handler: (req, res) => {
            const { id } = req.params;

            database.complete('users', id);

            return res.writeHead(204).end();
        }
    }
]

