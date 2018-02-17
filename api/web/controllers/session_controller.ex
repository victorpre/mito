defmodule Mito.SessionController do
  use Mito.Web, :controller

  alias Mito.Auth

  def login(conn, %{"user" => login_params}) do
    with {:ok, user, {:ok, token, _claims}} <- Auth.authenticate_user(login_params) do
      render(conn, Mito.UserView, "login.json", user: user, token: token)
    else
      {:error, msg} -> render(conn, Mito.ChangesetView, "error.json", changeset: msg)
    end
  end
end
