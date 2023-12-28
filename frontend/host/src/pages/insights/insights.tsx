import { gamesApi, gamesStatsApi } from '@/packages/games/games.package';
import { Tab, Tabs, User } from '@nextui-org/react';
import { useQuery } from 'react-query';
import { InsightsTable } from './libs/components/components.js';
import { MdOutlineScoreboard } from 'react-icons/md';
import { User as TUser } from '@/packages/users/users.package.js';
import { useState } from 'react';
import { formatGameTime } from '../game/libs/helpers/format-game-time.helper.js';
import { InsightsTabKey } from './libs/enums/enums.js';
import { aggregateLeaderboard } from './libs/helpers/helpers.js';

const renderUser = (item: TUser) => (
  <User
    name={item.name}
    description={item.email}
    avatarProps={{
      radius: 'full',
      size: 'sm',
      src: 'https://a5.behance.net/cc1f6d67328210c632719cfbf4152a6b1ca3b35a/img/profile/avatars/magicwand-138.png?cb=264615658',
    }}
    classNames={{
      description: 'text-default-500',
    }}
  >
    {item.name}
  </User>
);

const InsightsPage = () => {
  const [tab, setTab] = useState<string>(InsightsTabKey.LEADERBOARD);

  const { data: gameStats, isLoading: gamesStatsLoading } = useQuery(
    [gamesStatsApi.getAll.name, tab],
    () =>
      tab !== InsightsTabKey.LEADERBOARD
        ? gamesStatsApi.getAll(tab)
        : gamesStatsApi.getAll(),
  );

  const { data: games, isLoading: gamesLoading } = useQuery(
    [gamesApi.getAllGames.name],
    gamesApi.getAllGames,
  );

  const globalLeaderboard = aggregateLeaderboard(gameStats ?? []);

  const tabs = [
    {
      key: 'leaderboard',
      title: (
        <div className="flex items-center gap-2">
          <MdOutlineScoreboard />
          <span>Global Leaderborad</span>
        </div>
      ),
      content: (
        <InsightsTable
          data={globalLeaderboard}
          isLoading={gamesStatsLoading}
          columns={[
            { label: '', key: 'rating' },
            {
              label: 'Player',
              key: 'player',
              renderItem: renderUser,
            },
            {
              label: 'Total Scores',
              key: 'score',
              renderItem: (score) => <span className="font-bold">{score}</span>,
            },
          ]}
        />
      ),
    },
    ...(games ?? []).map((game) => {
      return {
        key: game.id,
        title: game.name,
        content: (
          <InsightsTable
            isLoading={gamesStatsLoading || gamesLoading}
            data={
              gameStats?.map((item, i) => ({
                ...item,
                date: new Date(item.createdAt).toLocaleDateString(),
                key: item.id,
                rating: i + 1,
                time: formatGameTime(item.time),
              })) ?? []
            }
            columns={[
              { label: '', key: 'rating' },
              { label: 'Date', key: 'date' },
              {
                label: 'Player',
                key: 'user',
                renderItem: renderUser,
              },
              { label: 'Time', key: 'time' },
              {
                label: 'Scores',
                key: 'score',
                renderItem: (score) => (
                  <span className="font-bold">{score}</span>
                ),
              },
            ]}
          />
        ),
      };
    }),
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Games Insights</h1>
      <p className="text-default-400 mb-7 max-w-2xl">
        your personal scorecard to gaming excellence! Discover your journey,
        track the games you've conquered, and relish in your triumphs. Explore a
        simplified interface showcasing the games you've played and your
        impressive scores.
      </p>
      <div>
        <div className="flex w-full flex-col">
          <Tabs
            aria-label="Options"
            selectedKey={tab}
            onSelectionChange={(key: React.Key) => setTab(key as string)}
          >
            {tabs.map((tab) => {
              return (
                <Tab key={tab.key} title={tab.title}>
                  {tab.content}
                </Tab>
              );
            })}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export { InsightsPage };
