import {useAuth0} from '@auth0/auth0-react';
import clsx from 'clsx';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import {Merge} from 'type-fest';
import {HeaderNavbarDropdown} from '~/components/HeaderNavbarDropdown';

export const Query = gql`
  query GetUserForHeaderNav {
    currentUser {
      name
      displayName
      picture
    }
  }
`;

export type ComponentProps = Merge<
  ContainerProps,
  {
    picture: string;
    name: string;
  }
>;
export const ComponentBase: React.FC<ComponentProps> = ({
  className,
  name,
  picture,
}) => (
  <details className={clsx(className, 'relative')}>
    <summary className={clsx('list-none', 'outline-none')}>
      <div className={clsx('cursor-pointer')}>
        <img src={picture} alt={name} className={clsx('h-8', 'rounded')} />
      </div>
    </summary>
    <HeaderNavbarDropdown
      className={clsx('absolute', 'min-w-full', 'mt-1', 'right-0', 'z-50')}
    />
  </details>
);

export const Component = styled(ComponentBase)`
  > summary {
    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 20;
    }
    &::-webkit-details-marker {
      display: none;
    }
  }
  &:not([open]) > summary::before {
    display: none;
  }
`;

export type ContainerProps = {
  className?: string;
};
export const Container: React.FC<ContainerProps> = (props) => {
  const {user} = useAuth0();

  return <Component {...props} {...user} />;
};