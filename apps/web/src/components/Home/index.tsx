import MetaTags from '@components/Common/MetaTags';
import NewPost from '@components/Composer/Post/New';
import ExploreFeed from '@components/Explore/Feed';
import Footer from '@components/Shared/Footer';
import { HomeFeedType } from '@lenster/data/enums';
import { PAGEVIEW } from '@lenster/data/tracking';
import { GridItemEight, GridItemFour, GridLayout } from '@lenster/ui';
import { Leafwatch } from '@lib/leafwatch';
import type { NextPage } from 'next';
import { useState } from 'react';
import { useAppStore } from 'src/store/app';
import { useEffectOnce } from 'usehooks-ts';

import AlgorithmicFeed from './AlgorithmicFeed';
import Tabs from './Algorithms/Tabs';
import EnableDispatcher from './EnableDispatcher';
import EnableMessages from './EnableMessages';
import FeedType from './FeedType';
import ForYou from './ForYou';
import Gitcoin from './Gitcoin';
import Hero from './Hero';
import Highlights from './Highlights';
import RecommendedProfiles from './RecommendedProfiles';
import SetDefaultProfile from './SetDefaultProfile';
import SetProfile from './SetProfile';
import Timeline from './Timeline';
import Waitlist from './Waitlist';

const Home: NextPage = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [feedType, setFeedType] = useState<HomeFeedType>(
    HomeFeedType.FOLLOWING
  );

  useEffectOnce(() => {
    Leafwatch.track(PAGEVIEW, { page: 'home' });
  });

  return (
    <>
      <MetaTags />
      {!currentProfile ? <Hero /> : null}
      <GridLayout>
        <GridItemEight className="space-y-5">
          {currentProfile ? (
            <>
              <NewPost />
              <div className="space-y-3">
                <FeedType feedType={feedType} setFeedType={setFeedType} />
                <Tabs feedType={feedType} setFeedType={setFeedType} />
              </div>
              {feedType === HomeFeedType.FOR_YOU ? (
                <ForYou />
              ) : feedType === HomeFeedType.FOLLOWING ? (
                <Timeline />
              ) : feedType === HomeFeedType.HIGHLIGHTS ? (
                <Highlights />
              ) : (
                <AlgorithmicFeed feedType={feedType} />
              )}
            </>
          ) : (
            <ExploreFeed />
          )}
        </GridItemEight>
        <GridItemFour>
          <Gitcoin />
          {currentProfile ? (
            <>
              <EnableDispatcher />
              <EnableMessages />
              <SetDefaultProfile />
              <SetProfile />
              <RecommendedProfiles />
            </>
          ) : (
            <Waitlist />
          )}
          <Footer />
        </GridItemFour>
      </GridLayout>
    </>
  );
};

export default Home;
