import React from 'react';
import { connect } from 'react-redux';
import { InitialState, Themes } from '../state/reducers';

interface HeaderLinkProps {
  isSelected?: boolean;
  theme: Themes;
  children: React.ReactNode;
}

const HeaderLink: React.FC<HeaderLinkProps> = ({
  children,
  isSelected,
  theme,
}) => {
  const classes = [
    'flex',
    'items-center',
    'text-left',
    theme === Themes.LIGHT ? 'text-gray-700' : 'text-gray-300',
    'block',
    'rounded',
    'leading-none',
    'py-3',
    'px-4',
    'w-full',
  ];

  if (typeof isSelected !== 'undefined') {
    if (theme === Themes.LIGHT) {
      classes.push(
        isSelected ? 'bg-purple-200 text-gray-900' : 'hover:bg-purple-200',
      );
    } else {
      classes.push(
        isSelected ? 'bg-purple-700 text-white' : 'hover:bg-purple-800',
      );
    }
  } else {
    classes.push(
      theme === Themes.LIGHT ? 'hover:bg-purple-200' : 'hover:bg-purple-800',
    );
  }

  return <span className={classes.join(' ')}>{children}</span>;
};

const mapStateToProps = (state: InitialState) => ({
  theme: state.ui.theme,
});

export default connect(mapStateToProps)(HeaderLink);
