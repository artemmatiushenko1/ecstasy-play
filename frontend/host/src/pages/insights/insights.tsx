import { gamesApi, gamesStatsApi } from '@/packages/games/games.package';
import { Tab, Tabs, User } from '@nextui-org/react';
import { useQuery } from 'react-query';
import { InsightsTable } from './libs/components/components.js';
import { MdOutlineScoreboard } from 'react-icons/md';
import { User as TUser } from '@/packages/users/users.package.js';
import { useState } from 'react';
import { formatGameTime } from '../game/libs/helpers/format-game-time.helper.js';

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
  const [tab, setTab] = useState('leaderboard');

  const { data: gameStats } = useQuery(['get-all-stats', tab], () => {
    if (tab !== 'leaderboard') {
      console.log({ tab });
      return gamesStatsApi.getAll(tab);
    } else {
      return gamesStatsApi.getAll();
    }
  });

  const { data: games } = useQuery(['get-all-games'], gamesApi.getAllGames);

  const globalLeaderboard = Object.entries(
    (gameStats ?? []).reduce(
      (acc, { user, score }) => ({
        ...acc,
        [user.id]: {
          name: user.name,
          email: user.email,
          score: (acc[user.id as keyof typeof acc]?.score ?? 0) + score,
        },
      }),
      {} as { [key: string]: { score: number; name: string; email: string } },
    ) ?? {},
  )
    .map(([key, value]) => ({
      key,
      player: { name: value.name, email: value.email },
      score: value.score,
    }))
    .sort((itemA, itemB) => itemB.score - itemA.score)
    .map((entry, i) => ({ ...entry, rating: i + 1 }));

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
            onSelectionChange={setTab}
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
