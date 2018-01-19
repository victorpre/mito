defmodule Mito.EjabberdController do
  use Mito.Web, :controller

  # This is used to import the jid record structure from ejabberd:
  require Record
  Record.defrecord :jid, Record.extract(:jid, from: "deps/ejabberd/include/jlib.hrl")

  def index(conn, params) do
    # get online jid, parse and extract the user part.
    online_users = :ejabberd_sm.connected_users
                   |> Enum.map( fn(x) -> {name,_,_} = :jid.split(:jlib.string_to_jid(x)); name   end)
    render(conn, "user.json", %{users: online_users})
  end
end
