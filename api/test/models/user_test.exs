defmodule Mito.UserTest do
  use Mito.ModelCase
  import Mito.Factory

  alias Mito.User

  @valid_attrs %{email: "some email", username: "some username"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, params_for(:user))
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end
end