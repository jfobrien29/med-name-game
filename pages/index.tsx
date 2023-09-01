import Game from 'views/game';
import MetaHead from '../frontend/common/MetaHead';
import PageContainer from '../frontend/common/PageContainer';

interface LandingPageProps {}
export default function LandingPage({}: LandingPageProps) {
  return (
    <>
      <MetaHead />
      <PageContainer sideBarOpen={false} maxW="full">
        <Game />
      </PageContainer>
    </>
  );
}

export async function getStaticProps() {
  try {
    return {
      props: {},
      revalidate: 60,
    };
  } catch (error) {
    console.error('error', error);
    return {
      props: {
        frames: [],
      },
      revalidate: 600,
    };
  }
}
