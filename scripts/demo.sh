#!/usr/bin/env bash
# End-to-end: start seller, buyer agent pays via 402 on Celo, prints result + tx hash.
# Testnet:  NETWORK=sepolia KEY_FILE=~/.celo/buyer.key PAY_TO=<seller> ./scripts/demo.sh
# Mainnet:  NETWORK=mainnet PAY_ASSET=0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e PAY_DECIMALS=6 PRICE=0.01 \
#           ERC8021_SUFFIX=<from enrolment> PAY_TO=<seller> CELO_AGENT_PK=<masked env> ./scripts/demo.sh
set -e; cd "$(dirname "$0")/.."
node src/server.js & S=$!; trap "kill $S" EXIT; sleep 1
node src/agent.js http://localhost:${PORT:-4021}/ap-check examples/invoice.json | tee -a runs.log
