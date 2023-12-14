import { Card, CardBody, Chip, Image } from '@nextui-org/react';
import { GameSummaryItem } from '../components';
import { MdPlayCircleFilled, MdSportsScore } from 'react-icons/md';

interface IGameCardProps {
  genre: string;
  name: string;
  coverImg: string;
  summary: {
    totalGames: number;
    bestScore: number;
  };
}

const GameCard = ({ genre, name, summary, coverImg }: IGameCardProps) => {
  return (
    <Card isPressable isHoverable fullWidth className="py-4 max-w-[400px]">
      <CardBody className="overflow-visible py-2 px-4 flex flex-row">
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <Chip
              size="sm"
              color="primary"
              className="text-tiny font-bold mb-2"
            >
              {genre}
            </Chip>
            <h4 className="font-bold text-large">{name}</h4>
          </div>
          <div className="flex justify-start gap-5">
            <GameSummaryItem
              title="Games"
              value={summary.totalGames}
              icon={<MdPlayCircleFilled className="text-sm" />}
            />
            <GameSummaryItem
              title="Best Score"
              value={summary.bestScore}
              icon={<MdSportsScore />}
            />
          </div>
        </div>
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={coverImg}
          width={150}
        />
      </CardBody>
    </Card>
  );
};

export { GameCard };
