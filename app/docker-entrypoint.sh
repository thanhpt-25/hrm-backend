#!/bin/sh
>&2 echo "Starting server..."
exec npm run start:$NODE_ENV
