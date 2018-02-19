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
    {:ok, user} =
      Auth.Guardian.Plug.current_claims(conn)
      |> Auth.Guardian.resource_from_claims()

    token = Auth.Guardian.Plug.current_token(conn)

    case Auth.Guardian.refresh(token) do
      {:ok, _old_stuff, {new_token, new_claims}} ->
        conn
        |> put_status(:ok)
        |> render(Mito.UserView, "login.json", user: user, token: new_token)

      {:error, _reason} ->
        conn
        |> put_status(:unauthorized)
        |> render(Mito.ErrorView, "forbidden.json", error: "Not authenticated")
    end
  end
end
