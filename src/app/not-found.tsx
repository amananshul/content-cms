'use client'
import { useEffect, useState } from 'react';
// Define an interface for meme data
interface MemeData {
  postLink: string;
  subreddit: string;
  title: string;
  url: string;
  nsfw: boolean;
  spoiler: boolean;
  author: string;
  ups: number;
  preview: string[];
}

const NotFoundPage = () => {
  // Set initial state with the defined interface
  const [memeData, setMemeData] = useState<MemeData | null>(null);

  useEffect(() => {
    const fetchMemeData = async () => {
      try {
        const response = await fetch('https://meme-api.com/gimme');
        const data = await response.json();
        setMemeData(data);
      } catch (error) {
        console.error('Error fetching meme data:', error);
      }
    };

    fetchMemeData();
  }, []);
console.log('memeData',memeData)
  return (
    <div>
      {memeData && (
        <div>
          <p>Check out this random meme:</p>
          <img src={memeData.url} alt={memeData.title} />
        </div>
      )}
    </div>
  );
};

export default NotFoundPage;
