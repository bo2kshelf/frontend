import clsx from 'clsx';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Merge} from 'type-fest';
import {BookLink} from '~/components/BookLink';
import {Spinner} from '~/components/Spinner/Spinner';
import {useBookshelfQuery} from '~~/generated/graphql-codegen/apollo';

export type ComponentProps = Merge<
  Pick<ContainerProps, 'className'>,
  {
    books: {id: string; cover?: string; title: string}[];
    i18n: {
      [key in 'bookCounts']: string;
    };
  }
>;
export const Component: React.FC<ComponentProps> = ({
  className,
  books,
  i18n,
}) => (
  <div className={clsx(className)}>
    <p>{i18n.bookCounts}</p>
    <ul className={clsx('grid', 'grid-cols-8', 'gap-4')}>
      {books.map(({cover, title, id}) => (
        <li key={id}>
          <BookLink className={clsx('h-full')} book={{id, cover, title}} />
        </li>
      ))}
    </ul>
  </div>
);

export type ContainerProps = {className?: string; id: string};
export const Container: React.FC<ContainerProps> = ({id, ...props}) => {
  const {t, i18n} = useTranslation();

  const {data, error, loading, fetchMore} = useBookshelfQuery({
    variables: {id},
  });

  const [books, setBooks] = useState<ComponentProps['books']>([]);
  const [pageInfo, setPageInfo] = useState<{
    hasNextPage: boolean;
    endCursor?: string;
  }>({hasNextPage: false});

  useEffect(() => {
    if (data?.bookshelf?.books.pageInfo && data.bookshelf.books.edges) {
      setBooks(
        data.bookshelf.books.edges.map(({node: {cover, ...rest}}) => ({
          ...rest,
          cover: cover || undefined,
        })),
      );
      setPageInfo({
        ...data.bookshelf.books.pageInfo,
        endCursor: data.bookshelf.books.pageInfo.endCursor || undefined,
      });
    }
  }, [data]);

  const next = () =>
    fetchMore({
      variables: {
        id,
        endCursor: pageInfo.endCursor,
      },
    }).then(({data}) => {
      if (data?.bookshelf?.books.pageInfo && data.bookshelf.books.edges) {
        setBooks([
          ...books,
          ...data.bookshelf.books.edges.map(({node: {cover, ...rest}}) => ({
            ...rest,
            cover: cover || undefined,
          })),
        ]);
        setPageInfo({
          ...data.bookshelf.books.pageInfo,
          endCursor: data.bookshelf.books.pageInfo.endCursor || undefined,
        });
      }
    });

  if (data && data.bookshelf) {
    return (
      <InfiniteScroll
        dataLength={books.length}
        next={next}
        hasMore={pageInfo.hasNextPage}
        loader={InfiniteLoader}
      >
        <Component
          {...props}
          books={books}
          i18n={{
            bookCounts: t('common:units.books', {
              count: data.bookshelf.books.totalItems,
            }),
          }}
        />
      </InfiniteScroll>
    );
  }

  if (loading) {
    <>
      <p>LOADING</p>
    </>;
  }
  return <p>{JSON.stringify(error)}</p>;
};

export const InfiniteLoader = (
  <Spinner className={clsx('text-blue-400', 'text-4xl')} />
);
