defmodule Mito.TokenAuthentication do
  @moduledoc """
    Service with functions for creating and signing in with magic link tokens.
  """
  alias Mito.Amnesia
  alias Database.User

  alias Phoenix.Token

  @account_verification_salt "account verification salt"

  def generate_new_account_token(%User{id: user_id}) do
    Phoenix.Token.sign(Mito.Endpoint, @account_verification_salt, user_id)
  end
end
