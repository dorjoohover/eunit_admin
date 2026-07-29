import { FunctionComponent, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FunctionComponent<AuthLayoutProps> = ({ children }) => {
  return (
    <div className='flex items-center justify-center h-screen bg-muted'>{children}</div>
  );
};

export default AuthLayout;
