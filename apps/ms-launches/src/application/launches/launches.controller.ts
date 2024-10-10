import { Router, Request, Response } from 'express'
import ValidationError from '@shared/errors/validation.error'

import { LaunchesDTO } from '../../shared/dtos/launches.dto'
import LaunchesService from './launches.service'

export default class LaunchesController {
    constructor(router: Router, private launchesService: LaunchesService) {
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

        router?.get('/launches', async (req: Request, res: Response) => {
            try {
                const rocketName = String(req.query.rocketName || '')
                const launches = await this.getLaunchesByRocket(rocketName)
                return res.json(launches)
            } catch (error) {
                return res.status(500).send(error)
            }
        })
    }

    async getLaunchesByRocket(rocketName: string): Promise<LaunchesDTO[]> {
        return await this.launchesService.getByName(rocketName)
    }

    async saveLaunch(launch: LaunchesDTO) {
        return await this.launchesService.saveOne(launch)
    }
}
