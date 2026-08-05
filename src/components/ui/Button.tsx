import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50';
    const variants = {
      default: 'bg-blue-600 text-white hover:bg-blue-700',
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      outline: 'border border-gray-300 dark:border-gray-700 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800',
      ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800',
    };
    const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-base', lg: 'px-6 py-3 text-lg' };
    return (
      <button className={cn(base, variants[variant], sizes[size], className)} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';
