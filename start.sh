#! /bin/bash
pgrep -o -u $(whoami) node >/dev/null
code=$?;
[ $code -eq 0 ] && kill $(pgrep -u $(whoami) node);
git pull;
npm i;
nohup node app.js &