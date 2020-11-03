import clsx from 'clsx';
import {Maybe} from 'graphql/jsutils/Maybe';
import Link from 'next/link';
import React from 'react';
import {Merge} from 'type-fest';
import {SeriesPageBooksList} from '~/components/Page/SeriesPage/SeriesPageBooksList';

export type ComponentProps = {
  className?: string;
  id: string;
  title: string;
  concluded: boolean;
  relatedAuthors: {
    id: string;
    name: string;
  }[];
  books: {
    id: string;
    title: string;
    cover?: string;
  }[];
  booksTotal: number;
};
export const Component: React.FC<ComponentProps> = ({
  className,
  title,
  relatedAuthors,
  books,
  concluded,
  booksTotal,
}) => (
  <main
    className={clsx(className, 'grid', 'grid-cols-1', 'gap-y-4', 'lg:gap-y-8')}
  >
    <div className={clsx()}>
      <div
        className={clsx(
          'container',
          'max-w-screen-lg',
          'mx-auto',
          'px-4',
          'lg:px-0',
        )}
      >
        <h1
          className={clsx(
            'text-3xl',
            'tracking-wide',
            'font-bold',
            'break-all',
            'mb-2',
            'select-all',
          )}
        >
          {title}
        </h1>
        <ul className={clsx('flex', 'space-x-2')}>
          {relatedAuthors.map(({id, name}) => (
            <li key={id}>
              <Link href={`/authors/${id}`} passHref>
                <a className={clsx('text-lg', 'select-all')}>{name}</a>
              </Link>
            </li>
          ))}
        </ul>
        <div className={clsx('flex', 'space-x-2', 'mt-2')}>
          <span className={clsx('text-sm')}>全{booksTotal}巻</span>
          {concluded && <span className={clsx('text-sm')}>完結済み</span>}
        </div>
      </div>
    </div>
    <div className={clsx()}>
      <SeriesPageBooksList className={clsx('w-full')} books={books} />
    </div>
  </main>
);

export type ContainerProps = Merge<
  Pick<
    ComponentProps,
    'className' | 'id' | 'title' | 'concluded' | 'relatedAuthors' | 'booksTotal'
  >,
  {
    books: {
      id: string;
      title: string;
      cover?: Maybe<string>;
    }[];
  }
>;
export const Container: React.FC<ContainerProps> = ({books, ...props}) => {
  return (
    <Component
      {...props}
      books={books.map(({cover, ...rest}) => ({
        cover: cover || undefined,
        ...rest,
      }))}
    />
  );
};