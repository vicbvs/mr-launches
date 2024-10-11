import { Router, Request, Response } from 'express'
import ValidationError from '@shared/errors/validation.error'

import { LaunchesDTO } from '../../shared/dtos/launches.dto'
import LaunchesService from './launches.service'
import { FilterParamsDTO } from '@shared/dtos/filter.dto'

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
