defmodule Mito.Factory do
  use ExMachina.Ecto, repo: Mito.Repo

  alias Mito.User

  def user_factory do
    %User{
      username: sequence(:username, &"username#{&1}"),
      name: "Test Name",
      email: sequence(:email, &"test#{&1}@user.com"),
      password: "123123123",
      password_hash: "3123123123123"
    }
  end
end
