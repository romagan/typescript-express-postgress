import Pool from 'pg-pool'

const db = new Pool({
  user: `dev_user`,
  password: `dev_user`,
  host: `localhost`,
  port: 5432,
  database: `crm_synergy`
})

export default db
