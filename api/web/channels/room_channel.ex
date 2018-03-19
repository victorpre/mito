defmodule Mito.RoomChannel do
  use Mito.Web, :channel

  def join("rooms:" <> room_id, %{"username" => username, "host" => host, "password" => pass}, socket) do
    jid = "#{username}@#{host}"

    {:ok, pid} = Mito.Auth.xmpp_login(jid, pass)
    {:ok, %{pid: pid}}
  end
end
