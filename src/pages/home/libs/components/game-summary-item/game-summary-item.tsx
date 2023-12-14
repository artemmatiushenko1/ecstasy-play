interface IGameSummaryItemProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

const GameSummaryItem = ({ title, value, icon }: IGameSummaryItemProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-lg font-medium inline-flex items-center gap-1">
        {icon}
        <span>{value}</span>
      </div>
      <div className="text-small text-default-500">{title}</div>
    </div>
  );
};

export { GameSummaryItem };
