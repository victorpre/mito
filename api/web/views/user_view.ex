defmodule Mito.UserView do
  use Mito.Web, :view

  def render("index.json", %{users: users}) do
    %{data: render_many(users, Mito.UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, Mito.UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id, email: user.email, username: user.username, name: user.name}
  end

  def render("login.json", %{user: user, token: token}) do
    %{token: token, email: user.email, username: user.username, name: user.name}
  end

  def render("logout.json", _) do
    %{data: %{msg: "Logged out successfully."}}
  end
end
