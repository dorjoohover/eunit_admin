import { FunctionComponent, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FunctionComponent<AuthLayoutProps> = ({ children }) => {
  return (
    <div className='flex items-center justify-center h-screen px-4 bg-gradient-to-br from-slate-100 via-muted to-slate-200'>
      {children}
    </div>
  );
};

export default AuthLayout;
