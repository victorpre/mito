defmodule Mito.UserTest do
  use Mito.ModelCase
  import Mito.Factory

  alias Mito.User

  @invalid_attrs %{email: "", username: ""}

  setup do
    :ejabberd_admin.registered_users("localhost")
    |> Enum.map(fn(u) -> :ejabberd_auth.remove_user(u, "localhost") end)
    :ok
  end

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, params_for(:user))
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end

  test "registration changeset with valid attributes" do
    changeset = User.registration_changeset(%User{}, params_for(:user))
    assert changeset.valid?
  end

  test "registration changeset generates password hash" do
    changeset = User.registration_changeset(%User{}, params_for(:user))
    assert changeset.changes[:password_hash]
  end

  test "registration captalizes user name" do
    changeset = User.registration_changeset(%User{}, params_for(:user, name: "nome"))
    assert changeset.changes.name == "Nome"
  end

  test "creation in ejabberd" do
    user = insert(:user)
    User.create_ejabberd_user(user, "localhost")
    assert :ejabberd_auth.user_exists(user.username, "localhost")
  end

  test "deletion in ejabberd" do
    user = insert(:user)
    User.create_ejabberd_user(user, "localhost")
    User.delete_ejabberd_user(user)
    refute :ejabberd_auth.user_exists(user.username, "localhost")
  end
end
