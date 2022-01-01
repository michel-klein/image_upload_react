import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    async ({ pageParam = null }) => {
      const response = await api.get('/api/images', {
        params: {
          after: pageParam,
        },
      });
      return response.data;
    },
    {
      getNextPageParam: (lastPage, pages) =>
        lastPage.after ? lastPage.after : null,
    }
  );


  const formattedData = useMemo(() => {
    return data?.pages.flatMap(imagePage => {
      return imagePage.data;
    })
  }, [data]);

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  console.log(data)
  console.log(formattedData)

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && !isFetchingNextPage && (
          <Button mt="6" onClick={() => fetchNextPage()}>Carregar mais</Button>
        )}
        {isFetchingNextPage && <Button>Carregando...</Button>}
      </Box>
    </>
  );
}
