import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from '@nextui-org/react';

interface IInsightsTableProps<T extends { key: string }> {
  columns: {
    label: string;
    key: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renderItem?: (data: any) => React.ReactNode;
  }[];
  data: T[];
  isLoading?: boolean;
}

const InsightsTable = <T extends { key: string }>({
  columns = [],
  data = [],
  isLoading,
}: IInsightsTableProps<T>) => {
  return (
    <Table>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        items={data}
        loadingContent={<Spinner />}
        emptyContent="Nothing to display."
        isLoading={isLoading}
      >
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => {
              const { renderItem } =
                columns.find((col) => col.key === columnKey) ?? {};

              return (
                <TableCell>
                  {renderItem
                    ? renderItem(getKeyValue(item, columnKey))
                    : getKeyValue(item, columnKey)}
                </TableCell>
              );
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export { InsightsTable };
