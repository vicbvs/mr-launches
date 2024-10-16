import axios from 'axios';
// import { launches } from '../models/LaunchesModel';

export type ILaunchProperties = {
    id: number;
    date?: string;
    rocketId: number;
    rocket?: IRocketProperties;
    success?: boolean;
    launchCode?: string;
};

export type IRocketProperties = {
    id: number;
    name: string;
};

export type IFilterParamsProperties = {
    rocketName: string
    date?: string
    successful?: boolean
}

class LaunchesService {
  getLaunches = async (filter: IFilterParamsProperties): Promise<ILaunchProperties[]> => {
    //TODO #TASK-FRONTEND-01 choose an http api to make a call to a 
    // endpoint http://localhost:3004/launches or https://testapi.io/api/awgustavo/launches 
    // if you are doing the frontend tasks first

    const launches = await axios.get<ILaunchProperties[], any>("http://localhost:3004/launches", {params: filter})

    return launches.data;
  };
}

export default new LaunchesService();
