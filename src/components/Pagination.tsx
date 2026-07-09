interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <div data-testid="pagination" className="mt-6 flex items-center justify-between rounded-lg border border-slate-200 bg-white px-6 py-4 shadow-sm">

      <p data-testid="page-info" className="text-sm text-slate-500">
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex items-center gap-2">

        <button
          data-testid="previous-page"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            data-testid={`page-${index + 1}`}
            onClick={() => onPageChange(index + 1)}
            className={`h-10 w-10 rounded-md text-sm font-medium transition ${currentPage === index + 1
              ? "bg-blue-600 text-white"
              : "border border-slate-300 hover:bg-slate-100"
              }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          data-testid="next-page"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default Pagination;