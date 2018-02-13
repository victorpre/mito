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

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, user_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen user", %{conn: conn} do
    user = insert(:user)
    conn = get conn, user_path(conn, :show, user)
    assert json_response(conn, 200)["data"] == %{"id" => user.id,
      "username" => user.username,
      "email" => user.email,
      "name" => user.name
    }
  end

  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, user_path(conn, :show, -1)
    end
  end

  test "creates user when data is valid", %{conn: conn} do
    user_params = params_for(:user, @valid_attrs)
    conn = post conn, user_path(conn, :create), user: user_params

    assert json_response(conn, 201)["data"]["id"]
  end

  test "generates password hash when data is valid", %{conn: conn} do
    user_params = @valid_attrs
    conn = post conn, user_path(conn, :create), user: user_params
    user_id = json_response(conn, 201)["data"]["id"]

    assert Repo.get(User, user_id).password_hash
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

  test "updates chosen user when data is valid", %{conn: conn} do
    user = insert(:user)
    user_params = params_for(:user, @valid_attrs)
    conn = put conn, user_path(conn, :update, user), user: user_params

    assert Repo.get_by(User, username: user_params.username)
  end

  test "renders chosen user when data is valid", %{conn: conn} do
    user = insert(:user)
    user_params = params_for(:user, @valid_attrs)
    conn = put conn, user_path(conn, :update, user), user: user_params
    assert json_response(conn, 200)["data"]["id"]
  end


  test "does not update chosen user and renders errors when data is invalid", %{conn: conn} do
    user = insert(:user)
    conn = put conn, user_path(conn, :update, user), user: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen user", %{conn: conn} do
    user = insert(:user)
    conn = delete conn, user_path(conn, :delete, user)
    assert response(conn, 204)
    refute Repo.get(User, user.id)
  end
end
