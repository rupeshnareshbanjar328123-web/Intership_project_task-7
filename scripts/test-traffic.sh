#!/bin/bash

export INGRESS_HOST=localhost
export INGRESS_PORT=31884
export GATEWAY_URL=$INGRESS_HOST:$INGRESS_PORT

echo "Sending 100 requests..."
for i in {1..100}; do
  curl -s http://$GATEWAY_URL | grep -o 'v[0-9]'
done | sort | uniq -c | sort -rn
