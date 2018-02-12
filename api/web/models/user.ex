defmodule Mito.User do
  use Mito.Web, :model

  @required_fields ~w(email username name)a

  schema "users" do
    field :username, :string
    field :email, :string
    field :password_hash, :string
    field :password, :string, virtual: true
    field :name, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields, [])
    |> validate_required(@required_fields)
    |> unique_constraint(:username)
    |> unique_constraint(:email)
    |> validate_length(:email, min: 1, max: 255)
    |> validate_format(:email, ~r/@/)
  end

  @doc """
  Build changeset for registration
  """
  def registration_changeset(struct, params \\ %{}) do
    struct
    |> changeset(params)
    |> cast(params, ~w(password), [])
    |> validate_length(:password, min: 8)
    |> put_password_hash
  end

  @doc """
  Creates a hash for the user password
  """
  defp put_password_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
        put_change(changeset, :password_hash, Comeonin.Argon2.hashpwsalt(password))
      _ ->
        changeset
    end
  end
end
