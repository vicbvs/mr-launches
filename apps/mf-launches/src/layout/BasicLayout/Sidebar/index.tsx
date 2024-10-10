import { ReactComponent as Logo } from '@/assets/svg/plank.svg';
import { ReactComponent as Home } from '@/assets/svg/command.svg';
import { ReactComponent as Launches } from '@/assets/svg/launch.svg';
import { SVGProps } from 'react';

export const Sidebar = () => {
    return (
        <aside className='main-layout--side flex flex-col gap-10 px-8 py-10 bg-white'>
            <Logo />

            <ol>
                <SidebarItem icon={'Home'} label='Home' />
            </ol>

            <ol>
                <SidebarItem icon={'Launches'} label='Launches' />
            </ol>
        </aside>
    );
};

export const IconDictionary = {
  Home,
  Launches,
};

export type IconOptions = keyof typeof IconDictionary;

interface Props extends SVGProps<SVGSVGElement> {
  icon: IconOptions;
}

const Icon = ({ icon, ...rest }: Props) => {
  const ChosenIcon = IconDictionary[icon];
  return <ChosenIcon {...rest} />;
};

type SidebarItemProp = {
  label: string;
  icon: 'Home' | 'Launches';
};

const SidebarItem = ({ label, icon }: SidebarItemProp) => {
  return (
    <li>
      <a href={label == 'Home' ? '/' : '/launches'} className='flex gap-4 text-graytext hover:text-blue hover:underline hover:underline-offset-4'>
        <Icon icon={icon} />
        <span className='text-base font-semibold'>{label}</span>
      </a>
    </li>
  );
};
