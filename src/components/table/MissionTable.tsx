import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Selection,
  SortDescriptor,
} from '@nextui-org/react';
import { TopContent } from './TopContent';
import { BottomContent } from './BottomContent';
import { useCallback, useMemo, useState } from 'react';
import { Mission } from '../../types';
import { FaPen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { missionColumns } from '../../constants';
import {
  getMissionTableFilteredItems,
  getMissionTableItems,
  getMissionTableSortedItems,
  getMissionTableTotalPages,
} from '../../helpers';
import { useSelector } from 'react-redux';
import { destinationsSelector, missionsSelector } from '../../redux/selectors';
import { MissionDeparture } from './MissionDeparture';

export const MissionTable = () => {
  const navigate = useNavigate();
  const missions = useSelector(missionsSelector);
  const destinations = useSelector(destinationsSelector);

  const [filterValue, setFilterValue] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [destinationFilter, setDestinationFilter] = useState<Selection>('all');
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'name',
    direction: 'ascending',
  });

  const filteredItems = useMemo(() => {
    return getMissionTableFilteredItems({
      missions,
      filterValue,
      destinationFilter: destinationFilter === 'all' ? 'all' : (Array.from(destinationFilter) as string[]),
      destinations,
    });
  }, [destinationFilter, destinations, filterValue, missions]);

  const pagesTotal = useMemo(() => getMissionTableTotalPages(filteredItems, rowsPerPage), [filteredItems, rowsPerPage]);

  const items = useMemo(
    () => getMissionTableItems(page, rowsPerPage, filteredItems),
    [page, filteredItems, rowsPerPage],
  );

  const sortedItems = useMemo(() => getMissionTableSortedItems(items, sortDescriptor), [sortDescriptor, items]);

  const renderCell = useCallback(
    (mission: Mission, columnKey: React.Key) => {
      const cellValue = mission[columnKey as keyof Mission];

      switch (columnKey) {
        case 'name':
          return <>{mission.name}</>;
        case 'members':
          return <>{mission.members.length}</>;
        case 'destination':
          return <>{mission.destination}</>;
        case 'departure':
          return <MissionDeparture departure={mission.departure} />;
        case 'edit':
          return (
            <span
              className="cursor-pointer text-lg text-default-400 hover:text-default-500 active:opacity-50"
              onClick={() => navigate(`/mission/${mission.id}`)}
            >
              <FaPen />
            </span>
          );
        default:
          return <>{cellValue}</>;
      }
    },
    [navigate],
  );

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={<BottomContent pagesTotal={pagesTotal} page={page} setPage={setPage} />}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: 'max-h-[382px]',
      }}
      sortDescriptor={sortDescriptor}
      topContent={
        <TopContent
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          missions={missions}
          destinationOptions={destinations}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          setDestinationFilter={setDestinationFilter}
          destinationFilter={destinationFilter}
          pagesTotal={pagesTotal}
        />
      }
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={missionColumns}>
        {(column) => (
          <TableColumn key={column.id} align={'start'} allowsSorting={column.sortable}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No missions found'} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
        )}
      </TableBody>
    </Table>
  );
};
