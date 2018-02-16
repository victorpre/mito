defmodule Mito.Auth do
  import Ecto.Query, only: [from: 2]
  alias Comeonin.Argon2
  alias Mito.{Repo, User}
  alias Mito.Auth.Guardian

  @doc """
  Searches the database for a user with the matching username, then
  checks that encrypting the plain text password matches in the
  encrypted password that was stored during user creation.
  """
  def authenticate_user(%User{username: username, password: password } = user) do
    query = from(u in User, where: u.username == ^username)

    Repo.one(query)
    |> check_password(password)
  end

  defp check_password(nil, _), do: {:error, "Incorrect username or password"}

  defp check_password(user, plain_text_password) do
    case Argon2.checkpw(plain_text_password, user.password_hash) do
      true -> Guardian.encode_and_sign(user)
      false -> {:error, "Incorrect username or password"}
    end
  end

  def get_user!(id), do: Repo.get!(User, id)
end
