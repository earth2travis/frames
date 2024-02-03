import { Metadata } from 'next';

const POST_URL = 'https://frames-yeet.vercel.app/api/frame';
const IMG_URL = 'https://frames-yeet.vercel.app/diarrhea.png';

console.log('posturl', POST_URL);
const frameMetadata = {
  'fc:frame': 'vNext',
  'fc:frame:image': IMG_URL,
  'fc:frame:button:1': 'YEET',
  'fc:frame:button:2': 'YEET',
  'fc:frame:button:3': 'YEET',
  'fc:frame:button:4': 'YEET',
  'fc:frame:post_url': POST_URL,
};

export const metadata: Metadata = {
  title: 'YEET, YEET, YEET, YEET, YEET',
  description: 'Woman Throws a Baby',
  openGraph: {
    title: 'YEET',
    images: [IMG_URL],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Home() {
  return (
    <>
      <main>YEET, YEET, YEET, YEET, YEET</main>
    </>
  );
}
