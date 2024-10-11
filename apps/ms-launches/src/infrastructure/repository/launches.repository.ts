import { AppDataSource } from './data-source'
import { Launches } from '../entities/launches.entity'
import { LaunchesDTO } from '@shared/dtos/launches.dto'
import { Like, MoreThanOrEqual } from 'typeorm';
import { FilterParamsDTO } from '@shared/dtos/filter.dto';

export class LaunchesRepository {
    constructor(private repository = AppDataSource.getRepository(Launches)) {}

    /*
    #TASK-BACKEND-1 (ORM) - WRITE A FUNCTION TO FIND IN THE SQLITE(database.sqlite) THE LAUNCHES BY THE ROCKET NAME, IT ALSO SHOULD INCLUDE 
    THE ASSOCIATION WITH ROCKET ENTITY. YOU MAY CHECK TYPEORM DOCUMENTATION IF NEEDED
    */

    async findByName(params: FilterParamsDTO): Promise<LaunchesDTO[]> {
        try {
            const launches = await this.repository.find({
                where: {
                    
                    rocket: { name: Like(`%${params?.rocketName}%`) },
                    ...(params?.date ? { date: MoreThanOrEqual(new Date(params.date)) } : {}),
                    ...(params?.successful ? { success: params?.successful } : {})
                },
                relations: {
                    rocket: true
                }
            });
            return launches.map(launch => this.parseEntityToDto(launch));
        } catch(err) {
            console.log(err)
        }
    }

    async save(launch: LaunchesDTO) {
        return this.parseEntityToDto(
            await this.repository.save(this.parseDtoToEntity(launch))
        )
    }

    parseDtoToEntity(launchDto: LaunchesDTO) {
        const launch: Launches = {
            id: launchDto.id,
            date: launchDto.date,
            rocket: launchDto.rocket
                ? { id: launchDto.rocket?.id, name: launchDto.rocket?.name }
                : null,
            success: launchDto.success,
            rocketId: launchDto.rocketId,
            launchCode: launchDto.launchCode,
        }
        return launch
    }

    parseEntityToDto(launch: LaunchesDTO) {
        const launchDto: Launches = {
            id: launch.id,
            date: launch.date,
            rocket: { id: launch.rocket.id, name: launch.rocket.name },
            success: launch.success,
            rocketId: launch.rocketId,
            launchCode: launch.launchCode,
        }
        return launchDto
    }
}
