defmodule Mito.UserTest do
  use Mito.ModelCase
  import Mito.Factory

  alias Mito.User

  @valid_attrs %{email: "victor@mito.com", username: "some username", name: "name"}
  @invalid_attrs %{}

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
end
