defmodule Mito.ChangesetView do
  use Mito.Web, :view

  @doc """
  Traverses and translates changeset errors.

  See `Ecto.Changeset.traverse_errors/2` and
  `Mito.ErrorHelpers.translate_error/1` for more details.
  """
  def translate_errors(changeset) do
    Ecto.Changeset.traverse_errors(changeset, &translate_error/1)
  end

  def render("error.json", %{changeset: changeset}) do
    # When encoded, the changeset returns its errors
    # as a JSON object. So we just pass it forward.
    %{errors: translate_errors(changeset)}
  end

  def available_message(changeset) do
    fields =
      changeset.changes
      |> Map.keys()
      |> Enum.join(", ")

    (fields <> " available")
    |> String.capitalize()
  end

  def not_available_message(changeset) do
    changeset.errors
    |> Enum.map(fn {field, er} -> %{"#{field}": String.capitalize("#{field}") <> " #{render_detail(er)}"} end)
    |> List.last
  end

  def render("available.json", %{changeset: changeset}) do
    %{status: "ok", data: available_message(changeset)}
  end

  def render("not_available.json", %{changeset: changeset}) do
    %{status: "error", data: not_available_message(changeset)}
  end

  def render_detail({message, values}) do
    Enum.reduce(values, message, fn {k, v}, acc ->
      String.replace(acc, "%{#{k}}", to_string(v))
      |> String.capitalize()
    end)
  end

  def render_detail(message) do
    message
  end
end
