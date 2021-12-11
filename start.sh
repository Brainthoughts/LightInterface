#! /bin/bash

kill $(pgrep -u $(whoami) node);
git pull;
npm i;
nohup node app.js &