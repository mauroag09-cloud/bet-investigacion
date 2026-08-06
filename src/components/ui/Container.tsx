import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const Container = ({ children, className = '', id }: ContainerProps) => {
  return (
    <div id={id} className={`max-w-[1200px] mx-auto px-6 w-full ${className}`}>
      {children}
    </div>
  );
};
