import React from 'react';
import { GetServerSideProps } from 'next';
import { client } from '@/utils/contentful';
import Card, { CardProps } from '@/components/Card';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface HomePageProps {
  cards: CardProps[];
}

const ProductDetailsPage: React.FC<HomePageProps> = ({ cards }) => {
  const currentTheme = useSelector((state: RootState) => state.theme.theme);

  return (
    <div className={currentTheme=='light'?"background-container":''}>
      <h1>Product Details Page</h1>
      {cards?.length && cards.map((card, index) => (
        <Card
          key={index}
          id={card.id}
          heading={card.heading}
          description={card.description}
          price={card.price}
          thumbnail={card.thumbnail}
          display={false}
        />
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<HomePageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  try {
    const response = await client.getEntry(slug);

    // Check if response exists and has fields
    if (response && response.fields) {
      const cardData: any = {
        id: response.sys.id || '',
        heading: response.fields.heading || '',
        description: response.fields.description || '',
        price: response.fields.price || 0, // Assuming price is a number
        thumbnail: response.fields.thumbnail || [],
      };

      return {
        props: {
          cards: [cardData],
        },
      };
    } else {
      console.error('Response from Contentful is invalid:', response);
      return {
        props: {
          cards: [],
        },
      };
    }
  } catch (error) {
    console.error('Error fetching data from Contentful:', error);
    return {
      props: {
        cards: [],
      },
    };
  }
};

export default ProductDetailsPage;
