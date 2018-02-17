defmodule Mito.UserController do
  use Mito.Web, :controller

  alias Mito.User
  alias Mito.Auth

  def index(conn, _params) do
    users = Repo.all(User)
    render(conn, "index.json", users: users)
  end


  def create(conn, %{"user" => user_params}) do
    changeset = User.registration_changeset(%User{}, user_params)

    case Repo.insert(changeset) do
      {:ok, user} ->
        User.create_ejabberd_user(user, conn.host)

        with {:ok, user, {:ok, token, _claims}} <- Auth.authenticate_user(user) do
          conn
          |> put_status(:created)
          |> put_resp_header("location", user_path(conn, :show, user))
          |> render("login.json", user: user, token: token)
        else
          {:error, msg} -> render(conn, Mito.ChangesetView, "error.json", changeset: changeset)
        end

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Mito.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Repo.get!(User, id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Repo.get!(User, id)
    changeset = User.changeset(user, user_params)

    case Repo.update(changeset) do
      {:ok, user} ->
        render(conn, "show.json", user: user)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Mito.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Repo.get!(User, id)

    case Repo.delete(user) do
      {:ok, struct} ->
        User.delete_ejabberd_user(struct)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Mito.ChangesetView, "error.json", changeset: changeset)
    end

    send_resp(conn, :no_content, "")
  end
end
