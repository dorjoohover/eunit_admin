'use client';

import { FunctionComponent, ReactNode, useState } from 'react';
import NavMain from '@/components/nav/NavMain';
import NavSide from '@/components/nav/NavSide';

interface NavContainerProps {
  children: ReactNode;
  supplier?: any;
}

const NavContainer: FunctionComponent<NavContainerProps> = props => {
  const { children, supplier } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className='flex h-screen'>
      <div className={isOpen ? 'w-60' : 'w-20'}>
        <NavSide isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      <div className='flex-1 flex flex-col h-full w-full overflow-hidden'>
        <div className='h-14'>
          <NavMain isOpen={isOpen} supplier={supplier} />
        </div>

        <div className='py-4 px-8 flex-1 overflow-auto'>{children}</div>
      </div>
    </div>
  );
};

export default NavContainer;
