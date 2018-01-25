defmodule Mito.PageController do
  use Mito.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
