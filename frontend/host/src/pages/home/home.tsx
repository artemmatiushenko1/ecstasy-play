import { GameCard } from './libs/components/components.js';
import tetrisCoverImage from '@/assets/tetris-cover.png';
import snakeCoverImage from '@/assets/snake-cover.png';
import connectTilesCoverImage from '@/assets/connect-tiles-cover.png';
import { GameApp, gamesApi } from '@/packages/games/games.package.js';
import { useProfileStore } from '@/stores/profile/profile.js';
import { useQuery } from 'react-query';
import { Spinner } from '@nextui-org/react';

const HomePage = () => {
  const user = useProfileStore((state) => state.user);

  const { data: games, isLoading } = useQuery(
    ['get-games'],
    gamesApi.getAllGames,
  );

  console.log({ games });

  const gamesMeta = {
    [GameApp.TETRIS]: {
      cover: tetrisCoverImage,
      genre: 'Puzzle',
      summary: {
        bestScore: 12505,
        totalGames: 34,
      },
    },
    [GameApp.SNAKE]: {
      cover: snakeCoverImage,
      genre: 'Puzzle',
      summary: {
        bestScore: 12505,
        totalGames: 34,
      },
    },
    [GameApp.CONNECT_TILES]: {
      cover: connectTilesCoverImage,
      genre: 'Memory',
      summary: {
        bestScore: 12505,
        totalGames: 34,
      },
    },
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome, {user?.name}! 👋</h1>
      <p className="text-default-400 mb-7 max-w-2xl">
        Welcome to our Games Library – a diverse collection of engaging
        mini-games to keep you entertained! Explore a variety of genres and
        challenge yourself with these bite-sized experiences.
      </p>
      {isLoading ? (
        <Spinner />
      ) : (
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
      )}
    </div>
  );
};

export { HomePage };
