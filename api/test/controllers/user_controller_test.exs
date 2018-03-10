defmodule Mito.UserControllerTest do
  use Mito.ConnCase
  import Mito.Factory

  alias Mito.User
  @valid_attrs %{username: "victor", name: "victor", email: "victor@mito.com", password: "123123123"}
  @invalid_attrs %{email: ""}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}

    case :ejabberd_auth.user_exists(@valid_attrs.username, "localhost") do
      true  -> :ejabberd_auth.remove_user(@valid_attrs.username, "localhost")
      _ -> :ok
    end
  end

  test "creates user when data is valid", %{conn: conn} do
    user_params = params_for(:user, @valid_attrs)
    conn = post conn, user_path(conn, :create), user: user_params

    assert json_response(conn, 201)
  end

  test "generates password hash when data is valid", %{conn: conn} do
    user_params = @valid_attrs
    conn = post conn, user_path(conn, :create), user: user_params
    user_id = json_response(conn, 201)["data"]["id"]

    assert Repo.get_by(User, email:  user_params.email).password_hash
  end

  test "renders user when data is valid", %{conn: conn} do
    user_params = params_for(:user, @valid_attrs)
    conn = post conn, user_path(conn, :create), user: user_params
    expected_params = Map.drop(user_params, [:name, :password, :password_hash])

    assert Repo.get_by(User, expected_params)
  end

  test "does not create user and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, user_path(conn, :create), user: @invalid_attrs

    assert json_response(conn, 422)["errors"] != %{}
  end

  test "username doesnt exist", %{conn: conn} do
    user_params = %{username: "new-user"}
    conn = post conn, user_path(conn, :validate), user: user_params

    assert json_response(conn, 200)["data"] == "Username available"
  end

  test "username exists", %{conn: conn} do
    user = insert(:user, @valid_attrs)
    user_params = %{username: user.username}
    conn = post conn, user_path(conn, :validate), user: user_params

    assert json_response(conn, 403)["data"] == "Username already exists"
  end
end
