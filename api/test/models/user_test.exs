defmodule Mito.UserTest do
  use Mito.ModelCase
  import Mito.Factory

  alias Mito.User

  @valid_attrs %{email: "test@user.com", username: "username", name: "name"}
  @invalid_attrs %{email: "", username: ""}

  setup do
    case :ejabberd_auth.user_exists(@valid_attrs.username, "localhost") do
      true  -> :ejabberd_auth.remove_user(@valid_attrs.username, "localhost")
      _ -> :ok
    end
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
    attrs = Map.merge(@valid_attrs, %{password: "123123123"})
    changeset = User.registration_changeset(%User{}, attrs)
    assert changeset.valid?
  end

  test "registration changeset generates password hash" do
    attrs = Map.merge(@valid_attrs, %{password: "123123123"})
    changeset = User.registration_changeset(%User{}, attrs)
    assert changeset.changes[:password_hash]
  end

  test "registration captalizes user name" do
    attrs = Map.merge(@valid_attrs, %{password: "123123123"})
    changeset = User.registration_changeset(%User{}, attrs)
    assert changeset.changes.name == "Name"
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
