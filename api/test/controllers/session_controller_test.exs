defmodule Mito.LoginControllerTest do
  use Mito.ConnCase
  import Mito.Factory
  alias Mito.User

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "login feature", %{conn: conn} do
    changeset = User.registration_changeset(%User{}, params_for(:user))
    {:ok, user} = Repo.insert(changeset)
    login_params = %{email: user.email, password: user.password }
    conn = post conn, session_path(conn, :login), user: login_params
    assert json_response(conn, 200)["username"] == user.username
  end
end
