import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const [modalOpen, setModalOpen] = useState(false)


  // TODO SELECTED IMAGE URL STATE
  const [selectedImageUrl, setSelectedImageUrl] = useState('')

  // TODO FUNCTION HANDLE VIEW IMAGE
  function handleViewImage(url) {
    setSelectedImageUrl(url);
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
  }

  return (
    <>
      <SimpleGrid gap="40px" columns={3}>
        {cards.map(card => {
          return (
            <Card
              key={card.id}
              data={card}
              viewImage={url => handleViewImage(url)}
            />
          );
        })}
      </SimpleGrid>

      <ModalViewImage
        isOpen={modalOpen}
        onClose={handleCloseModal}
        imgUrl={selectedImageUrl}
      />
    </>
  );
}
