import { LaunchesRepository } from '@infrastructure/repository/launches.repository'
import { LaunchesDTO } from '@shared/dtos/launches.dto'
import ValidationError from '@shared/errors/validation.error'

import express from 'express'
import * as crypto from 'crypto'

import LaunchesController from './launches.controller'
import LaunchesService from './launches.service'

jest.mock('@infrastructure/repository/launches.repository')
const LaunchesRepositoryMock =
  LaunchesRepository as jest.Mock<LaunchesRepository>
const launchesRepositoryMock = new LaunchesRepositoryMock()

const router = express.Router()

describe("POST /launch", () => {
    test('should add a new launch', async () => {
        const launchToCreate: LaunchesDTO = new LaunchesDTO(
            1,
            { name: 'Appolo', id: 1 },
            1,
            new Date(),
            true,
            'af454482-8e0f-4d2f-875b-2b1265b001f6'
        )
        const responsePromise = new Promise<LaunchesDTO>((resolve) => {
            return resolve(launchToCreate)
        })

        jest
            .spyOn(launchesRepositoryMock, 'save')
            .mockReturnValueOnce(responsePromise)
        const launch = await new LaunchesController(
            router,
            new LaunchesService(launchesRepositoryMock)
        ).saveLaunch(launchToCreate)

        expect(launch).toBeDefined()
    })

    test('should try to add a new launch and return a validation error', async () => {
        const launchToCreate: LaunchesDTO = {
            id: 1,
            rocket: null,
            rocketId: 0,
            date: null,
            success: true,
            launchCode: null,
        }
        const responsePromise = new Promise<LaunchesDTO>((resolve) => {
            return resolve(launchToCreate)
        })

        jest
            .spyOn(launchesRepositoryMock, 'save')
            .mockReturnValueOnce(responsePromise)
        let errorTest = null
        try {
            await new LaunchesController(
                router,
                new LaunchesService(launchesRepositoryMock)
            ).saveLaunch(launchToCreate)
        } catch (error) {
            errorTest = error
        }
        expect(errorTest).toBeInstanceOf(ValidationError)
    })
})

/*
    #TASK-BACKEND-4 (TESTS/JEST)- WRITE A TEST TO VALIDATE ALL THE FLOW IMPLEMENTED.
  */ 

describe("GET /launches", () => {
        
    const mockLaunches: LaunchesDTO[] = [
        {
          date: new Date('2022-04-22'),
          id: 1,
          rocketId: 1,
          rocket: { id: 1, name: 'SpaceX' },
          success: true,
          launchCode: '123456',
        },
        {
          date: new Date('2022-05-10'),
          id: 2,
          rocketId: 2,
          rocket: {
            id: 2,
            name: 'SpaceX2',
          },
          success: true,
          launchCode: '123456',
        },
        {
          date: new Date('2022-07-18'),
          id: 3,
          rocketId: 3,
          rocket: {
            id: 3,
            name: 'SpaceX3',
          },
          success: false,
          launchCode: '123456',
        }
    ];

    const responsePromise = (mockedLaunches: LaunchesDTO[] = mockLaunches) => new Promise<LaunchesDTO[]>((resolve) => {
        return resolve(mockedLaunches)
    })

    test('should return all launches', async () => {
        jest
            .spyOn(launchesRepositoryMock, 'findByName')
            .mockReturnValueOnce(responsePromise())

        const launches = await new LaunchesController(
            router,
            new LaunchesService(launchesRepositoryMock)
        ).getLaunchesByRocket("")

        expect(Array.isArray(launches)).toBe(true);
        expect(launches.length).toBe(3);
    })

    test('should return launch by name', async () => {
        jest
            .spyOn(launchesRepositoryMock, 'findByName')
            .mockReturnValueOnce(responsePromise([mockLaunches[1]]))

        const launches = await new LaunchesController(
            router,
            new LaunchesService(launchesRepositoryMock)
        ).getLaunchesByRocket("X2")

        expect(Array.isArray(launches)).toBe(true);
        expect(launches.length).toBe(1); // não funciona
    })   

    test('should return launches sorted from oldest to newest by date', async () => {
        jest
            .spyOn(launchesRepositoryMock, 'findByName')
            .mockReturnValueOnce(responsePromise())

        const launches = await new LaunchesController(
            router,
            new LaunchesService(launchesRepositoryMock)
        ).getLaunchesByRocket("")

        for (let i = 0; i < launches.length - 1; i++) {
            const currentLaunchDate = new Date(launches[i].date);
            const nextLaunchDate = new Date(launches[i + 1].date);

            expect(nextLaunchDate <= currentLaunchDate).toBe(true);
        }
    })

    test('should return launch with encrypted launchCode using HMAC', async () => {
        jest
            .spyOn(launchesRepositoryMock, 'findByName')
            .mockReturnValueOnce(responsePromise())

        const launches = await new LaunchesController(
            router,
            new LaunchesService(launchesRepositoryMock)
        ).getLaunchesByRocket("")        

        for (let i = 0; i < launches.length - 1; i++) {
            const expectedEncryptedLaunchCode = crypto.createHmac('sha256', 'ABC')
                                                .update(String([mockLaunches[i].launchCode]))
                                                .digest('hex');
                                                
            expect(launches[i].launchCode).toBe(expectedEncryptedLaunchCode);
        }
    })
})
