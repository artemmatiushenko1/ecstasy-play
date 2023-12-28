import { GameCard } from './libs/components/components.js';
import tetrisCoverImage from '@/assets/tetris-cover.png';
import snakeCoverImage from '@/assets/snake-cover.png';
import connectTilesCoverImage from '@/assets/connect-tiles-cover.png';
import {
  GameApp,
  gamesApi,
  gamesStatsApi,
} from '@/packages/games/games.package.js';
import { useProfileStore } from '@/stores/profile/profile.js';
import { useQuery } from 'react-query';
import { Spinner } from '@nextui-org/react';

const HomePage = () => {
  const user = useProfileStore((state) => state.user);

  const { data: games, isLoading: getGamesLoading } = useQuery(
    ['get-games'],
    gamesApi.getAllGames,
  );

  const { data: gameStats, isLoading: getStatsLoding } = useQuery(
    ['get-all-stats'],
    () => gamesStatsApi.getAll(),
  );

  console.log(gameStats);

  const userStats = (gameStats ?? []).filter(
    (item) => item.user.id === user?.id,
  );

  const scoresByGames = userStats.reduce(
    (acc, item) => ({
      ...acc,
      [item.game.name]: [...(acc[item.game.name] ?? []), item.score],
    }),
    {} as { [key: string]: number[] },
  );

  const gamesMeta = {
    [GameApp.TETRIS]: {
      cover: tetrisCoverImage,
      genre: 'Puzzle',
      summary: {
        bestScore: scoresByGames[GameApp.TETRIS]
          ? Math.max(...scoresByGames[GameApp.TETRIS])
          : 0,
        totalGames: scoresByGames[GameApp.TETRIS]?.length ?? 0,
      },
    },
    [GameApp.SNAKE]: {
      cover: snakeCoverImage,
      genre: 'Puzzle',
      summary: {
        bestScore: scoresByGames[GameApp.SNAKE]
          ? Math.max(...scoresByGames[GameApp.SNAKE])
          : 0,
        totalGames: scoresByGames[GameApp.SNAKE]?.length ?? 0,
      },
    },
    [GameApp.CONNECT_TILES]: {
      cover: connectTilesCoverImage,
      genre: 'Memory',
      summary: {
        bestScore: scoresByGames[GameApp.CONNECT_TILES]
          ? Math.max(...scoresByGames[GameApp.CONNECT_TILES])
          : 0,
        totalGames: scoresByGames[GameApp.CONNECT_TILES]?.length ?? 0,
      },
    },
  };

  if (getGamesLoading || getStatsLoding) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome, {user?.name}! 👋</h1>
      <p className="text-default-400 mb-7 max-w-2xl">
        Welcome to our Games Library – a diverse collection of engaging
        mini-games to keep you entertained! Explore a variety of genres and
        challenge yourself with these bite-sized experiences.
      </p>

      <div className="flex gap-3 flex-wrap">
        {games?.map((game) => {
          const meta = gamesMeta[game.name as keyof typeof gamesMeta];

          return (
            <GameCard
              key={game.id}
              id={game.id}
              name={game.name}
              genre={meta.genre}
              coverImg={meta.cover}
              summary={meta.summary}
            />
          );
        })}
      </div>
    </div>
  );
};

export { HomePage };
