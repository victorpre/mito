use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :mito, Mito.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :mito, Mito.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "mito_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

config :ejabberd,
  file: "config/ejabberd.test.yml",
  log_path: 'logs/ejabberd.test.log'

