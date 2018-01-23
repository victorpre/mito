defmodule Mito.Router do
  use Mito.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", Mito do
    pipe_through :api

    get "/ejabberd", EjabberdController, :index
    get "/verify", UserController, :verify_email
    post "/register", UserController, :create
  end
end
