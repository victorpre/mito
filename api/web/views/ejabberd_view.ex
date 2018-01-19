defmodule Mito.EjabberdView do
  use Mito.Web, :view

  def render("user.json", %{users: users}) do
    %{
      users: users
    }
  end
end
