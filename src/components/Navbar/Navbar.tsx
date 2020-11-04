import {faDatabase} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React from 'react';
import {NavbarSearchBox} from '~/components/Navbar/NavbarSearchBox';
import {NavbarProfile} from '~/components/Navbar/Profile';

export type ComponentProps = {
  className?: string;

  profile: {
    name: string;
    displayName: string;
    picture: string;
  };
};
export const Component: React.FC<ComponentProps> = ({className, profile}) => (
  <nav className={clsx(className, 'bg-blue-900', 'h-20')}>
    <div
      className={clsx(
        'container',
        'h-full',
        'mx-auto',
        'flex',
        'justify-center',
        'items-center',
        'space-x-8',
        'px-4',
        'lg:px-0',
      )}
    >
      <div
        className={clsx(
          'flex-grow',
          'lg:flex-grow-0',
          'flex',
          'justify-center',
          'items-center',
        )}
      >
        <FontAwesomeIcon
          icon={faDatabase}
          className={clsx('text-3xl', 'text-teal-400')}
          fixedWidth
        />
      </div>
      <div className={clsx('flex-grow', 'hidden', 'lg:block')}>
        <NavbarSearchBox className={clsx('w-full')} />
      </div>
      <div
        className={clsx('flex-grow', 'flex', 'justify-center', 'items-center')}
      >
        <NavbarProfile profile={profile} />
      </div>
    </div>
  </nav>
);

export type ContainerProps = ComponentProps;
export const Container: React.FC<ContainerProps> = (props) => {
  return <Component {...props} />;
};
