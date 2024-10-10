import { ILaunchProperties } from 'src/services/launches.service';
import style from './index.module.scss';
import { formatDate } from '@/utils/globals/date';
import { CiEdit, CiTrash } from "react-icons/ci";

const LaunchesList = ({launches}: {launches: ILaunchProperties[]}) => {
  return (
    <div className={style.results}>
        <h1>Launches List</h1>
        <table className={style.table}>
            <thead className={style.header}>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Status
                    </th>
                    <th>
                        Create Date
                    </th>
                    <th>
                        Rocket
                    </th>
                    <th>
                        
                    </th>
                </tr>
            </thead>
            <tbody className={style.body}>
                {
                    launches.map(launch => {
                        return (
                            <tr key={launch.id}>
                                <td>
                                    <div className={style.launchCode}>
                                        {launch.rocket?.name}
                                        <span>{launch.launchCode}</span>
                                    </div>
                                </td>
                                <td className={style.status}>
                                    {launch.success ? <span className={style.success}>Sucesso</span> : <span className={style.error}>Erro</span>}
                                </td>
                                <td>
                                    {formatDate(launch.date)}
                                </td>
                                <td>
                                    {launch.rocket?.name}
                                </td>
                                <td>
                                    <div className={style.actions}>
                                        <CiEdit size={20} />
                                        <CiTrash size={20} />
                                    </div>
                                </td>
                            </tr>                                               
                        )
                    })
                }
            </tbody>
        </table>        
    </div>
  )
};

export default LaunchesList;
