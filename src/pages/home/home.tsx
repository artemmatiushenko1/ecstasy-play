import { GameCard } from './libs/components/components.js';
import tetrisCoverImage from '@/assets/tetris-cover.png';
import snakeCoverImage from '@/assets/snake-cover.png';
import connectTilesCoverImage from '@/assets/connect-tiles-cover.png';

const HomePage = () => {
  const games = [
    {
      key: 'tetris',
      name: 'Tetris',
      path: '/games/tetris',
      cover: tetrisCoverImage,
      genre: 'Puzzle',
      summary: {
        bestScore: 12505,
        totalGames: 34,
      },
    },
    {
      key: 'snake',
      name: 'Snake',
      path: '/games/snake',
      cover: snakeCoverImage,
      genre: 'Puzzle',
      summary: {
        bestScore: 12505,
        totalGames: 34,
      },
    },
    {
      key: 'connectTiles',
      name: 'Connect Tiles',
      path: '/games/connect-tiles',
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
      <h1 className="text-2xl font-bold">Welcome, Jane! 👋</h1>
      <p className="text-default-400 mb-7 max-w-2xl">
        Welcome to our Games Library – a diverse collection of engaging
        mini-games to keep you entertained! Explore a variety of genres and
        challenge yourself with these bite-sized experiences.
      </p>
      <div className="flex gap-3 flex-wrap">
        {games.map((game) => (
          <GameCard
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
