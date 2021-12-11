#! /bin/bash

kill $(pgrep -u $(whoami) node);
git pull;
npm i;
node app.js;