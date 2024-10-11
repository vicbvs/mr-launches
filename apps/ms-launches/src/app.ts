import express, { Request, Response, Router } from 'express'
import cors from 'cors'
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import LaunchesController from 'src/application/launches/launches.controller'
import LaunchesService from 'src/application/launches/launches.service'
import { AppDataSource } from 'src/infrastructure/repository/data-source'
import { LaunchesRepository } from 'src/infrastructure/repository/launches.repository'

/*
    #TASK-BACKEND-0 (CODE ORGANIZATION UNDERSTANDING)- NAVIGATE THROUGH THE CODE TO UNDERSTAND HOW IT IS ORGANIZED AND THEN EXPLAIN TO US.
  */

async function initialize() {
    await AppDataSource.initialize().catch((error) => console.log(error))

    const app = express()
    app.use(express.json())

    app.use(cors());

    const swaggerOptions = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Launches - API Documentation',
                version: '1.0.0',
                description: '',
            },
            servers: [
                {
                    url: 'http://localhost:3004',
                },
            ],
        },
        apis: ['./src/application/launches/*.ts'],
    };
    
    const swaggerDocs = swaggerJsdoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    app.get('/', (_req: Request, res: Response) => {
        res.json({ keepAlive: Date.now() })
    })

    const routes: Router = express.Router()
    new LaunchesController(routes, new LaunchesService(new LaunchesRepository()))

    app.use(routes)

    app.listen(3004, () => {
        console.log('App Running: http://localhost:3004')
        console.log('Swagger docs available on http://localhost:3004/api-docs');
    })
}

initialize()
