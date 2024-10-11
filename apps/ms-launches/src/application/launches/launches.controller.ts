import { Router, Request, Response } from 'express'
import ValidationError from '@shared/errors/validation.error'

import { LaunchesDTO } from '../../shared/dtos/launches.dto'
import LaunchesService from './launches.service'
import { FilterParamsDTO } from '@shared/dtos/filter.dto'

export default class LaunchesController {
    constructor(router: Router, private launchesService: LaunchesService) {

        /**
         * @swagger
         * /launches:
         *   post:
         *     summary: Creates a new launch
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               rocketId:
         *                 type: number
         *                 description: Rocket Id
         *                 example: 456
         *               date:
         *                 type: string
         *                 format: date-time
         *                 description: Launch create date
         *                 example: "2024-12-25"
         *               success:
         *                 type: boolean
         *                 description: Indicates whether the launch was successful
         *                 example: true
         *               launchCode:
         *                 type: string
         *                 description: Unique launch code
         *                 example: "LCH2024-001"
         *     responses:
         *       201:
         *         description: Created
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 type: object
         *                 properties:
         *                   id:
         *                     type: number
         *                     example: 123
         *                   rocket:
         *                     type: object
         *                     properties:
         *                       id:
         *                         type: number
         *                         example: 456
         *                       name:
         *                         type: string
         *                         example: "Falcon 9"
         *                   rocketId:
         *                     type: number
         *                     example: 456
         *                   date:
         *                     type: string
         *                     format: date-time
         *                     example: "2024-12-25"
         *                   success:
         *                     type: boolean
         *                     example: true
         *                   launchCode:
         *                     type: string
         *                     example: "LCH2024-001"
         *       400:
         *         description: Bad Request
         *       500:
         *         description: Internal Server Error
         */
        router?.post('/launches', async (req: Request, res: Response) => {
            try {
                const launch = req.body
                return res.json(await this.saveLaunch(launch))
            } catch (error) {
                return error instanceof ValidationError
                    ? res.status(400).send(error)
                    : res.status(500).send(error)
            }
        })

    /*
      #TASK-BACKEND-3 (EXPRESS)- WRITE A EXPRESS ROUTE TO RECEIVE A ROCKET NAME AS A QUERY PARAMETER 
      AND THEM CREATE A CONTROLLER FUNCTION TO RETRIEVE THE LAUNCHES PASSING THE ROCKET NAME AS AN ARGUMENT.
      AN EMPTY ROCKET NAME SHOULD RETURN ALL THE LAUNCHES
     */
        /**
         * @swagger
         * /launches:
         *   get:
         *     summary: Returns a list of launches
         *     parameters:
         *       - in: query
         *         name: rocketName
         *         schema:
         *           type: string
         *         description: Filter by rocket name
         *         example: "Falcon 9"
         *       - in: query
         *         name: date
         *         schema:
         *           type: string
         *           format: date
         *         description: Filter minimum launch created date
         *         example: "2024-12-25"
         *       - in: query
         *         name: successful
         *         schema:
         *           type: boolean
         *         description: Filter only successful launches
         *         example: true
         *     responses:
         *       200:
         *         description: OK
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 type: object
         *                 properties:
         *                   id:
         *                     type: number
         *                     example: 123
         *                   rocket:
         *                     type: object
         *                     properties:
         *                       id:
         *                         type: number
         *                         example: 456
         *                       name:
         *                         type: string
         *                         example: "Falcon 9"
         *                   rocketId:
         *                     type: number
         *                     example: 456
         *                   date:
         *                     type: string
         *                     format: date-time
         *                     example: "2024-12-25"
         *                   success:
         *                     type: boolean
         *                     example: true
         *                   launchCode:
         *                     type: string
         *                     example: "LCH2024-001"
         *       500:
         *         description: Internal Server Error
         */
        router?.get('/launches', async (req: Request, res: Response) => {
            try {
                const params: FilterParamsDTO = {
                    rocketName: String(req.query.rocketName || ''),
                    date: String(req.query.date || ''),
                    successful: req.query.successful === 'false' ? false : true
                }

                const launches = await this.getLaunchesByRocket(params)
                return res.json(launches)
            } catch (error) {
                return res.status(500).send(error)
            }
        })
    }

    async getLaunchesByRocket(params: FilterParamsDTO): Promise<LaunchesDTO[]> {
        return await this.launchesService.getByName(params)
    }

    async saveLaunch(launch: LaunchesDTO) {
        return await this.launchesService.saveOne(launch)
    }
}
