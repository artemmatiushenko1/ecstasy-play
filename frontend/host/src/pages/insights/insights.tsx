import { gamesStatsApi } from '@/packages/games/games.package';
import { Tab, Tabs, User } from '@nextui-org/react';
import { useQuery } from 'react-query';
import { InsightsTable } from './libs/components/components.js';
import { MdHistoryToggleOff, MdOutlineScoreboard } from 'react-icons/md';
import { useProfileStore } from '@/stores/profile/profile.js';
import { formatGameTime } from '../game/libs/helpers/format-game-time.helper.js';
import { User as TUser } from '@/packages/users/users.package.js';

const InsightsPage = () => {
  const user = useProfileStore(({ user }) => user);
  const { data } = useQuery(['get-all-stats'], gamesStatsApi.getAll);

  const leaderboard = Object.entries(
    data?.reduce(
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

  const history = (data ?? [])
    .filter((entry) => entry.user.id === user?.id)
    .map((entry) => {
      const date = new Date(entry.createdAt);

      return {
        key: entry.id,
        game: entry.game.name,
        score: entry.score,
        date: `${date.getFullYear()}/${
          date.getMonth() + 1
        }/${date.getDate()}` as string,
        time: formatGameTime(entry.time),
      };
    });

  console.log({ history });

  const tabs = [
    {
      key: 'Leaderborad',
      title: (
        <div className="flex items-center gap-2">
          <MdOutlineScoreboard />
          <span>Leaderborad</span>
        </div>
      ),
      content: (
        <InsightsTable
          data={leaderboard}
          columns={[
            { label: '', key: 'rating' },
            {
              label: 'Player',
              key: 'player',
              renderItem: (item: TUser) => (
                <User
                  avatarProps={{
                    radius: 'full',
                    size: 'sm',
                    src: 'https://a5.behance.net/cc1f6d67328210c632719cfbf4152a6b1ca3b35a/img/profile/avatars/magicwand-138.png?cb=264615658',
                  }}
                  classNames={{
                    description: 'text-default-500',
                  }}
                  description={item.email}
                  name={item.name}
                >
                  {item.name}
                </User>
              ),
            },
            { label: 'Total Scores', key: 'score' },
          ]}
        />
      ),
    },
    {
      key: 'Your history',
      title: (
        <div className="flex items-center gap-2">
          <MdHistoryToggleOff />
          <span>Your history</span>
        </div>
      ),
      content: (
        <InsightsTable
          data={history}
          columns={[
            { label: 'Date', key: 'date' },
            { label: 'Game', key: 'game' },
            { label: 'Time', key: 'time' },
            { label: 'Total Scores', key: 'score' },
          ]}
        />
      ),
    },
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
          <Tabs aria-label="Options">
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
