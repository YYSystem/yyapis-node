#!/bin/sh

# [proto-loader-gen-types](https://www.npmjs.com/package/@grpc/proto-loader)

PROTO_DIR=proto
OUT_DIR=$PROTO_DIR/generated
rm -rf $OUT_DIR
mkdir -p $OUT_DIR
yarn proto-loader-gen-types \
  --grpcLib=@grpc/grpc-js \
  --outDir=$OUT_DIR \
  $PROTO_DIR/*.proto