const grpc = require('grpc')
import server from './config/app'
import './config/database'

server.bind('127.0.0.1:50052', grpc.ServerCredentials.createInsecure())
server.start()