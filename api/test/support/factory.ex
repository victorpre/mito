defmodule Mito.Factory do
  use ExMachina.Ecto, repo: Mito.Repo

  alias Mito.User

  def user_factory do
    %User{
      username: "victorpre",
      email: "victor@victorpre.com",
      password_hash: "123123123"
    }
  end
end
