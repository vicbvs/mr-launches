import { render, screen } from '@testing-library/react';
import Launches from '@/pages/Launches';
import LaunchesList from '@/components/LaunchesList';
import { ILaunchProperties } from 'src/services/launches.service';

//TODO #TASK-FRONTEND-04 create assertion to our service ordenation and our list component


describe('Launches', () => {
        
    const mockLaunches: ILaunchProperties[] = [
        {
          date: '2022-04-22',
          id: 1,
          rocketId: 1,
          rocket: { id: 1, name: 'SpaceX' },
          success: true,
          launchCode: '123456',
        },
        {
          date: '2022-05-10',
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
          date: '2022-07-18',
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
    
    test('renders launches component', () => {
        render(<Launches />);

        expect(screen.getByTestId('launches-title')).toHaveTextContent('Launches');
    });

    test('renders launches list component', () => {
        render(<LaunchesList />);

        expect(screen.getByTestId('launches-list-title')).toHaveTextContent('Launches List');
    });

    test('renders launches list component with results', () => {
        render(<LaunchesList launches={mockLaunches} />);

        expect(screen.getAllByTestId('launch-id')).toHaveLength(3)
    });

    test('renders launches list component with results ordered', () => {
        const orderedLaunches = mockLaunches.sort((a, b) => new Date(String(b.date)).getTime() - new Date(String(a.date)).getTime());
        
        render(<LaunchesList launches={orderedLaunches} />);

        expect(screen.getAllByTestId('launch-id')).toHaveLength(3)

        expect(screen.getAllByTestId('launch-id')[0]).toHaveTextContent(orderedLaunches[0].rocket?.name || "");
        expect(screen.getAllByTestId('launch-id')[1]).toHaveTextContent(orderedLaunches[1].rocket?.name || "");
        expect(screen.getAllByTestId('launch-id')[2]).toHaveTextContent(orderedLaunches[2].rocket?.name || "");
    });

})