import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Selection } from '@nextui-org/react';
import { useCallback } from 'react';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import { Mission } from '../../types';

interface TopContentProps {
  setRowsPerPage: (page: number) => void;
  missions: Mission[];
  destinationOptions: string[];
  filterValue: string;
  setFilterValue: (value: string) => void;
  setPage: (page: number) => void;
  setDestinationFilter: (value: Selection) => void;
  destinationFilter: Selection;
  pagesTotal: number;
}

export const TopContent = ({
  setRowsPerPage,
  missions,
  destinationOptions,
  setFilterValue,
  filterValue,
  setPage,
  setDestinationFilter,
  destinationFilter,
  pagesTotal,
}: TopContentProps) => {
  const onClear = useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, [setFilterValue, setPage]);

  const onSearchChange = useCallback(
    (value?: string) => {
      if (value) {
        setFilterValue(value);
        setPage(1);
      } else {
        setFilterValue('');
      }
    },
    [setFilterValue, setPage],
  );

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [setRowsPerPage, setPage],
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-3">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          startContent={<FaSearch />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3">
          <Dropdown data-testid="tableFilter">
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<FaChevronDown />} variant="flat">
                Destination
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={destinationFilter}
              selectionMode="multiple"
              onSelectionChange={setDestinationFilter}
            >
              {destinationOptions.map((destination) => (
                <DropdownItem key={destination} className="capitalize">
                  {destination}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      {pagesTotal > 1 && (
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">Total {missions.length} missions</span>
          <label className="flex items-center text-small text-default-400">
            Rows per page:
            <select className="bg-transparent text-small text-default-400 outline-none" onChange={onRowsPerPageChange}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      )}
    </div>
  );
};
