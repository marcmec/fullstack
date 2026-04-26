import 'dotenv/config'
import { build } from './app'

const app = build()

app.listen({ port: 3001, host: '0.0.0.0' }, (err) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})