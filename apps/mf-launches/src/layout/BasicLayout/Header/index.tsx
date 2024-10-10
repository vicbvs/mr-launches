import { ReactComponent as Notification } from '@/assets/svg/notification.svg';
import { ReactComponent as ChevronDown } from '@/assets/svg/chevron-down.svg';

import './style.scss';
export const Header = () => {
  return (
    <header className='main-layout--header flex justify-between items-center'>
      <div className='flex flex-col'>
        <h1 className='text-xl font-semibold'>Hello, Plankton</h1>
        <h4 className='text-sm text-gray75'>Have a nice day</h4>
      </div>
      <div className='flex items-center gap-1'>
        <button>
          <Notification className='w-6 h-6' />
        </button>
        <hr className='w-10 rotate-90 border-grayc2' />
        <button className='flex gap-3 items-center'>
          <img
            className='w-10 h-10 rounded-full'
            src='https://avatars.githubusercontent.com/u/100000?s=460&u=1f0b6e8b7b2b0b2b0b2b0b2b0b2b0b2b0b2b0b2b'
            alt='avatar'
          />
          <div className='flex flex-col justify-center items-start'>
            <h4 className='text-sm font-semibold'>Plankton</h4>
            <h5 className='text-xs text-gray75'>Admin</h5>
          </div>
          <ChevronDown className='w-4 h-4' />
        </button>
      </div>
    </header>
  );
};
