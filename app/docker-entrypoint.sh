#!/bin/sh
>&2 echo "Starting server..."
npm run typeorm migration:run && npm run start:$NODE_ENV
