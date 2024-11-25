#!/bin/sh

INPUT_DIR=protos
OUT_DIR=$INPUT_DIR/generated
rm -rf $OUT_DIR
mkdir -p $OUT_DIR
pnpm proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=$OUT_DIR $INPUT_DIR/*.proto