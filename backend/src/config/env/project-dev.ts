
export default {
  LOG_DIR:'/var/log/ut',
  postgres:{
    user: 'zhongzhengkai',
    database: 'finance',
    //password: 'boldseas2016@finance',
    host:'localhost',
    port: 5432,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
  },
}