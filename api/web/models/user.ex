defmodule Mito.User do
  use Mito.Web, :model

  schema "users" do
    field :username, :string
    field :email, :string
    field :password_hash, :string
    field :password, :string, virtual: true

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:username, :email, :password_hash])
    |> validate_length(:email, min: 1, max: 255)
    |> validate_required([:username, :email, :password_hash])
  end
end
