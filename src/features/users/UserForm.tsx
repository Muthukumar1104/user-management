import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  userSchema,
  type UserFormValues,
} from "@/features/users/schema/userSchema";

import type { User } from "@/types/users";

interface UserFormProps {
  initialValues?: User | null;
  onSubmit: (data: UserFormValues) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const UserForm = ({
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: UserFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),

    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: 18,
      status: "Active",
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        firstName: initialValues.firstName,
        lastName: initialValues.lastName,
        email: initialValues.email,
        age: initialValues.age,
        status: initialValues.status,
      });
    } else {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        age: 18,
        status: "Active",
      });
    }
  }, [initialValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* First Name */}
      <div>
        <label className="mb-1 block font-medium">
          First Name
        </label>

        <input
          data-testid="first-name"
          {...register("firstName")}
          className="w-full rounded-lg border px-3 py-2"
        />

        {errors.firstName && (
          <p className="mt-1 text-sm text-red-500">
            {errors.firstName.message}
          </p>
        )}
      </div>

      {/* Last Name */}
      <div>
        <label className="mb-1 block font-medium">
          Last Name
        </label>

        <input
          data-testid="last-name"
          {...register("lastName")}
          className="w-full rounded-lg border px-3 py-2"
        />

        {errors.lastName && (
          <p className="mt-1 text-sm text-red-500">
            {errors.lastName.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="mb-1 block font-medium">
          Email
        </label>

        <input
          data-testid="email"
          type="email"
          {...register("email")}
          className="w-full rounded-lg border px-3 py-2"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Age */}
      <div>
        <label className="mb-1 block font-medium">
          Age
        </label>

        <input
          data-testid="age"
          type="number"
          {...register("age", {
            valueAsNumber: true,
          })}
          className="w-full rounded-lg border px-3 py-2"
        />

        {errors.age && (
          <p className="mt-1 text-sm text-red-500">
            {errors.age.message}
          </p>
        )}
      </div>

      {/* Status */}
      <div>
        <label className="mb-1 block font-medium">
          Status
        </label>

        <select
          data-testid="status"
          {...register("status")}
          className="w-full rounded-lg border px-3 py-2"
        >
          <option value="Active">
            Active
          </option>

          <option value="Inactive">
            Inactive
          </option>
        </select>

        {errors.status && (
          <p className="mt-1 text-sm text-red-500">
            {errors.status.message}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          data-testid="cancel-user"
          type="button"
          onClick={onCancel}
          className="rounded-lg border px-5 py-2"
        >
          Cancel
        </button>

        <button
          data-testid="save-user"
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white disabled:opacity-50"
        >
          {isSubmitting
            ? "Saving..."
            : initialValues
              ? "Update User"
              : "Create User"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;