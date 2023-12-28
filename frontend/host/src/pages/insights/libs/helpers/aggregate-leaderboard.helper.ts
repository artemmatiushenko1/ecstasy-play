import { GameStatsEntry } from '@/packages/games/libs/types/game-stats-entry.type';

const aggregateLeaderboard = (stats: GameStatsEntry[]) =>
  Object.entries(
    (stats ?? []).reduce(
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

export { aggregateLeaderboard };
