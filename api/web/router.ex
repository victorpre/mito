defmodule Mito.Router do
  use Mito.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :api_auth do
    plug Mito.Auth.Pipeline
  end

  scope "/", Mito do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  scope "/api", Mito do
    pipe_through :api


    resources "/users", UserController, only: [:create]
    post "/register", UserController, :create
    post "/login", SessionController, :login
  end

  # Other scopes may use custom stacks.
  scope "/api", Mito do
    pipe_through [:api, :api_auth]


    resources "/users", UserController, except: [:create]
    post "/sessions/refresh", SessionController, :refresh
    delete "/logout", SessionController, :logout
  end
end
