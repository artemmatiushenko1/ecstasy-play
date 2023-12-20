import { GameCard } from './libs/components/components.js';
import tetrisCoverImage from '@/assets/tetris-cover.png';
import snakeCoverImage from '@/assets/snake-cover.png';
import connectTilesCoverImage from '@/assets/connect-tiles-cover.png';
import { GameApp } from '@/packages/games/games.package.js';
import { useAuthStore } from '@/stores/auth/auth.js';

const HomePage = () => {
  const { user } = useAuthStore();

  const games = [
    {
      key: GameApp.TETRIS,
      name: 'Tetris',
      cover: tetrisCoverImage,
      genre: 'Puzzle',
      summary: {
        bestScore: 12505,
        totalGames: 34,
      },
    },
    {
      key: GameApp.SNAKE,
      name: 'Snake',
      cover: snakeCoverImage,
      genre: 'Puzzle',
      summary: {
        bestScore: 12505,
        totalGames: 34,
      },
    },
    {
      key: GameApp.CONNECT_TILES,
      name: 'Connect Tiles',
      cover: connectTilesCoverImage,
      genre: 'Memory',
      summary: {
        bestScore: 12505,
        totalGames: 34,
      },
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome, {user.firstName}! 👋</h1>
      <p className="text-default-400 mb-7 max-w-2xl">
        Welcome to our Games Library – a diverse collection of engaging
        mini-games to keep you entertained! Explore a variety of genres and
        challenge yourself with these bite-sized experiences.
      </p>
      <div className="flex gap-3 flex-wrap">
        {games.map((game) => (
          <GameCard
            key={game.key}
            id={game.key}
            name={game.name}
            genre={game.genre}
            coverImg={game.cover}
            summary={game.summary}
          />
        ))}
      </div>
    </div>
  );
};

export { HomePage };