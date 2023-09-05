import Game from 'views/game';
import MetaHead from '../frontend/common/MetaHead';
import PageContainer from '../frontend/common/PageContainer';
import { PERSON_DATA_ARRAY } from 'utils/constants';

interface LandingPageProps {
  allPeople: any[];
}
export default function LandingPage({ allPeople }: LandingPageProps) {
  return (
    <>
      <MetaHead />
      <PageContainer sideBarOpen={false} maxW="full">
        <Game allPeople={allPeople} />
      </PageContainer>
    </>
  );
}

const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export async function getStaticProps() {
  try {
    return {
      props: {
        allPeople: shuffleArray(PERSON_DATA_ARRAY),
      },
      revalidate: 30,
    };
  } catch (error) {
    console.error('error', error);
    return {
      props: {
        allPeople: shuffleArray(PERSON_DATA_ARRAY),
      },
      revalidate: 30,
    };
  }
}
