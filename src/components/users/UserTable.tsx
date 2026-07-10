import type { User } from "@/types/users";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

const UserTable = ({
  users,
  onEdit,
  onDelete,
}: UserTableProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table data-testid="users-table" className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                ID
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Name
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Email
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-200">

            {users?.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-10 text-center text-slate-500"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  data-testid={`user-row-${user.id}`}
                  className="transition hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    {user.id}
                  </td>

                  <td className="px-6 py-4 font-medium text-slate-800">
                    {user.firstName} {user.lastName}
                  </td>

                  <td className="px-6 py-4">
                    {user.email}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                    >
                      {user.status}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex justify-center gap-3">

                      <button
                        data-testid={`edit-user-${user.id}`}
                        onClick={() => onEdit(user)}
                        className="rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-600"
                      >
                        Edit
                      </button>

                      <button
                        data-testid={`delete-user-${user.id}`}
                        onClick={() => onDelete(user.id)}
                        className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default UserTable;