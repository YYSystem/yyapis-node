import {resolve, dirname} from 'path'
import {fileURLToPath} from 'url'
import {credentials, loadPackageDefinition} from '@grpc/grpc-js'
import {loadSync} from '@grpc/proto-loader'
import {ProtoGrpcType} from '../../protos/generated/yysystem.audioclassification'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const protoFile = resolve(__dirname, `../../protos/yysystem.audioclassification.proto`)

const packageDefinition = loadSync(protoFile)
const grpcObj = loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType
const proto = grpcObj.yysystem.audioclassification
const ssl = credentials.createSsl()
export default function audioClassificationClient() {
  return new proto.YYAudioClassification('api-grpc-2.yysystem2021.com', ssl)
}
