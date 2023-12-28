import { Chip, Tooltip } from '@nextui-org/react';

interface IGameMetaChip {
  icon: React.ReactNode;
  value: string | number;
  tooltip: string;
}

const GameMetaChip = ({ icon, value, tooltip }: IGameMetaChip) => {
  return (
    <Tooltip content={tooltip} placement="bottom">
      <Chip
        color="primary"
        className="text-xl"
        classNames={{
          base: 'h-auto bg-primary-50',
          content: 'flex items-center gap-2 text-primary font-medium',
        }}
      >
        {icon}
        <span>{value}</span>
      </Chip>
    </Tooltip>
  );
};

export { GameMetaChip };
