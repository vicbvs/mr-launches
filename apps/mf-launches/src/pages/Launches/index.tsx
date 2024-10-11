import React, { useEffect, useRef, useState } from 'react';
import { LuSettings2 } from 'react-icons/lu'
import { IoSearch } from "react-icons/io5";

import LaunchesService, { ILaunchProperties } from '../../services/launches.service';
import LaunchesList from '@/components/LaunchesList';
import style from './index.module.scss';

//TODO #TASK-FRONTEND-02 Create a method with service callback, create a list component to receive de object retrieved from the api call

const Launches = () => {
    const [launches, setLaunches] = useState<ILaunchProperties[]>([]);
    const [search, setSearch] = useState<string>("");
    const [isOpen, setIsOpen] = useState<Boolean>(true);

    const [date, setDate] = useState<string>("");
    const [successful, setSuccessful] = useState<boolean>(false);

    const fetchLaunches = async() => {
        setLaunches(await LaunchesService.getLaunches({ rocketName: search, date, successful }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value)
    }

    const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.currentTarget.value)
    }

    const handleSuccessful = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSuccessful(e.currentTarget.checked)
    }

    const handleApplyFilter = async (e: React.MouseEvent<HTMLButtonElement>) => {
        fetchLaunches()
    }

    function toggleFilter() {
        setIsOpen((isOpen) => !isOpen);
    }

    useEffect(() => {
        fetchLaunches();
    }, [search]);

    return (
        <div className={style.index_page}>
            <h1 data-testid='launches-title'>Launches</h1>
            <div className={style.options}>
                <div className={style.search}>
                    <IoSearch size={16} />
                    <input type="text" placeholder="Search" className={style.search_input} onChange={handleChange} />
                </div>
                <button className={style.add}>Add launch +</button>
                <div className={style.settings}>
                    <div>
                        <label htmlFor="sort">Sort by</label>
                        <select name="sort" id=""></select>
                    </div>
                    <div>
                        <label htmlFor="saved">Saved search</label>
                        <select name="saved" id=""></select>
                    </div>
                    <button onClick={toggleFilter}>
                        <LuSettings2 size={20} />
                    </button>
                </div>
            </div>
            { isOpen && (
                <div className={style.filter}>
                    <div>
                        <label htmlFor="dateFilter">Minimum Date:</label>
                        <input id="dateFilter" type="date" className={style.date} onChange={handleDate} />
                    </div>
                    <div>
                        <label htmlFor="successful">Only Successful:</label>
                        <input id="successful" type="checkbox" className={style.successful} onChange={handleSuccessful} />
                    </div>
                    <div>
                        <button className={style.apply} onClick={handleApplyFilter}>
                            Apply filter
                        </button>
                    </div>
                </div>
            )}
            <LaunchesList data-testid='launches-list' launches={launches} />
        </div>
    );
};

export default Launches;
