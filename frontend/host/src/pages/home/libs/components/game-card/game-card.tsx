import { Button, Card, CardBody, Chip, Image } from '@nextui-org/react';
import { GameSummaryItem } from '../components.js';
import { MdPlayCircleFilled, MdSportsScore } from 'react-icons/md';
import styles from './game-card.module.scss';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '@/libs/enums/enums.js';

interface IGameCardProps {
  id: string;
  genre: string;
  name: string;
  coverImg: string;
  summary: {
    totalGames: number;
    bestScore: number;
  };
}

const GameCard = ({ genre, name, summary, coverImg, id }: IGameCardProps) => {
  const navigate = useNavigate();

  const handlePlayNowClick = () =>
    navigate(AppRoute.GAME, { state: { appId: id, appName: name } });

  return (
    <Card
      fullWidth
      className={classNames('py-4 max-w-[400px]', styles.gameCard)}
    >
      <div className={styles.gameCardOverlay}>
        <Button
          disableRipple
          disableAnimation
          color="primary"
          radius="full"
          onClick={handlePlayNowClick}
          startContent={<MdPlayCircleFilled className="text-xl" />}
        >
          Play Now
        </Button>
      </div>
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
          className="object-cover rounded-xl w-[150px]"
          src={coverImg}
          width={150}
          height={150}
        />
      </CardBody>
    </Card>
  );
};

export { GameCard };
