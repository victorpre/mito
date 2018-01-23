defmodule Mito.UserController do
  use Mito.Web, :controller
  # Debugging
  # require IEx

  alias Database.User

  def create(conn, %{"user" => %{"name"=>name, "email"=>email}} = params) do
    Amnesia.transaction do
      # IEx.pry
    end
  end

  def verify_email(conn, params) do

  end
end
