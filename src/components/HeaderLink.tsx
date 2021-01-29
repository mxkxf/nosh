import React from 'react';
interface HeaderLinkProps {
  isSelected?: boolean;
  children: React.ReactNode;
}

const HeaderLink: React.FC<HeaderLinkProps> = ({ children, isSelected }) => {
  const classes = [
    'flex',
    'items-center',
    'justify-start',
    'text-left',
    'text-gray-700',
    'dark:text-gray-300',
    'block',
    'rounded',
    'leading-normal',
    'py-3',
    'px-4',
    'w-full',
    'overflow-hidden',
  ];

  if (isSelected) {
    classes.push(
      'bg-indigo-200',
      'text-gray-900',
      'dark:bg-indigo-700',
      'dark:text-white',
    );
  } else {
    classes.push('hover:bg-indigo-200', 'dark:hover:bg-indigo-800');
  }

  return <div className={classes.join(' ')}>{children}</div>;
};

export default HeaderLink;
