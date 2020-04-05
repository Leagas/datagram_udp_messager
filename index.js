const dgram = require('dgram')
const port = 333
const host = '127.0.0.1'

//server

const server = dgram.createSocket('udp4')

server.on('listening', () => console.log('listening UDP'))

server.on('message', (msg, rinfo) => {
  console.log(`${rinfo.address}:${rinfo.port} - ${msg}`)
})

server.bind(port, host)

//client

const client = dgram.createSocket('udp4')
const msg = Buffer.from('fuck off')

client.send(msg, 0, 4, port, host, (err) => {
  if (err) throw err

  console.log('UDP msg sent')
  client.send(msg, 4, msg.length, port, host, (err) => {
    if (err) throw err

    console.log('UDP msg sent')
    client.close()
  })
})
