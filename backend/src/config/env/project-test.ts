
export default {
  LOG_DIR:'/var/log/ut',
  postgres:{
    user: 'financeuser',
    database: 'finance',
    password: 'boldseas2016@finance',
    host:'192.168.2.222',
    port: 5432,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
  },
}