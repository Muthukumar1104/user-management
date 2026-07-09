interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput = ({
  value,
  onChange,
}: SearchInputProps) => {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <div className="w-full md:max-w-sm">
        <input
          type="text"
          value={value}
          placeholder="Search by name or email..."
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

    </div>
  );
};

export default SearchInput;