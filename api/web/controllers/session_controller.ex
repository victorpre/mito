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

  def refresh(conn, _params) do
    token = Auth.Guardian.Plug.current_token(conn)

    case Auth.Guardian.resource_from_token(token) do
      {:ok, user, _claims} ->
        conn
        |> put_status(:ok)
        |> render(Mito.UserView, "login.json", user: user, token: token)

      {:error, _reason} ->
        conn
        |> put_status(:unauthorized)
        |> render(Mito.ErrorView, "forbidden.json", error: "Not authenticated")
    end
  end
end
