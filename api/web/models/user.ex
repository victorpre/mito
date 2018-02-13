defmodule Mito.User do
  use Mito.Web, :model
  alias Mito.User

  @required_fields ~w(email username name)a
  @host Application.get_env(:mito, Mito.Repo)[:hostname]

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
    |> update_change(:name, &format_name/1)
    |> update_change(:email, &String.downcase/1)
    |> update_change(:username, &String.downcase/1)
    |> validate_length(:username, min: 1)
    |> validate_length(:name, min: 1)
    |> validate_length(:email, min: 1, max: 255)
    |> unique_constraint(:username)
    |> unique_constraint(:email)
    |> validate_format(:email, ~r/@/)
    |> validate_unique_user()
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
  Register user on ejabberd server
  """
  def create_ejabberd_user(%User{username: username, password: password } = user, host) do
    :ejabberd_auth.try_register(username, host, password)
  end

  @doc """
  Delete user from ejabberd server
  """
  def delete_ejabberd_user(%User{username: username}) do
    :ejabberd_auth.remove_user(username, @host)
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

  @doc """
  Sets a standard for user names
  """
  defp format_name(name) do
    name
    |> String.split(" ")
    |> Enum.map( &String.capitalize/1)
    |> Enum.join(" ")
  end

  @doc """
  Checks for unique username on ejabberd side
  """
  defp validate_unique_user(%{changes: user} = changeset) do
    case (changeset.valid? && :ejabberd_auth.user_exists(user.username, @host)) do
      true  -> add_error(changeset, :username, "already exists")
      false -> changeset
    end
  end
end
