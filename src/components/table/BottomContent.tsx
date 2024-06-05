import { Pagination } from '@nextui-org/react';

interface BottomContentProps {
  pagesTotal: number;
  page: number;
  setPage: (page: number) => void;
}

export const BottomContent = ({ pagesTotal, page, setPage }: BottomContentProps) => {
  if (pagesTotal < 2) return null;

  return (
    <div className="flex justify-center p-2">
      <Pagination isCompact showControls showShadow color="primary" page={page} total={pagesTotal} onChange={setPage} />
    </div>
  );
};
