import { GetStaticProps } from 'next';
import { createClient } from 'contentful';
import { client } from '../utils/contentful';
import Card, { CardProps } from '@/components/Card';
import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from '@/store';
import Loading from '@/components/Loading';
import { setLoading } from '@/store/reducers/loadingReducer';
const darkBackground = 'bg-gray-900'; // Dark background color
const lightBackground = 'bg-white';   // Light background color



interface HomePageProps {
  cards: CardProps[];
}

const HomePage: React.FC<HomePageProps> = ({ cards }) => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const dispatch = useDispatch();
   
console.log('isLoading',isLoading)
    const currentTheme = useSelector((state: RootState) => state.theme.theme);
    const backgroundClass = currentTheme === 'dark' ? darkBackground : lightBackground

  return (
    <div className={`h-screen ${backgroundClass}`}>
    <div className="flex flex-wrap">
     {isLoading ? 
        <Loading />
       : cards.map((card, index) => (
        <Card
          key={index}
          id={card.id}
          heading={card.heading}
          description={card.description}
          price={card.price}
          thumbnail={card.thumbnail}
          display={true}
        />
      ))}
    </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {

  try {
    store.dispatch(setLoading(true));

    const entries = await client.getEntries();
    const Cards: any[] = entries.items.map((entry) => ({
      id: entry.sys.id || '',
      heading: entry.fields.heading || '',
      description: entry.fields.description || '',
      price: entry.fields.price || 0,
      thumbnail: entry.fields.thumbnail || [],
    }));
    store.dispatch(setLoading(false));
    return {
      props: {
        cards: Cards,
      },
    };
  } catch (error) {
    console.error('Error fetching data from Contentful:', error);
    return {
      props: {
        cards: [],
      },
    };
  }
};

export default HomePage;
