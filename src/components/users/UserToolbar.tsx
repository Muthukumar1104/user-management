interface UserToolbarProps {
  search: string;
  onSearch: (value: string) => void;
  onAddUser: () => void;
}

const UserToolbar = ({
  search,
  onSearch,
  onAddUser,
}: UserToolbarProps) => {
  return (
    <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            User Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage all organization users.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">

          <input
            data-testid="search-user"
            type="text"
            value={search}
            placeholder="Search users..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 sm:w-72"
          />

          <button
            data-testid="add-user-button"
            onClick={onAddUser}
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
          >
            + Add User
          </button>

        </div>

      </div>

    </div>
  );
};

export default UserToolbar;