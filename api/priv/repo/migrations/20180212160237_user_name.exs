defmodule Mito.Repo.Migrations.UserName do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :name, :string, null: false
    end
  end
end
