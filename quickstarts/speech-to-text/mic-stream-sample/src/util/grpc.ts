import {resolve} from 'path'
import {
  credentials,
  loadPackageDefinition,
  Metadata,
  StatusObject,
} from '@grpc/grpc-js'
import {loadSync} from '@grpc/proto-loader'
import {ProtoGrpcType} from '../../proto/generated/yysystem'
import {yyapisSsl} from './process.env'

const protoFile = resolve(__dirname, '../../proto/yysystem.proto')

export const loadYYSystemPackage = async () => {
  const packageDefinition = loadSync(protoFile)
  const grpcObj = loadPackageDefinition(
    packageDefinition
  ) as unknown as ProtoGrpcType
  return grpcObj.yysystem
}

export const creds = yyapisSsl
  ? credentials.createSsl()
  : credentials.createInsecure()

export const isStatusObject = (value: unknown): value is StatusObject => {
  if (typeof value !== 'object' || value === null) return false
  const statusObject = value as Record<keyof StatusObject, unknown>
  if (typeof statusObject.code !== 'number') return false
  if (typeof statusObject.details !== 'string') return false
  return statusObject.metadata instanceof Metadata
}
