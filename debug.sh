#! /bin/bash
pgrep -o -u $(whoami) node >/dev/null
code=$?;
[ $code -eq 0 ] && kill $(pgrep -u $(whoami) node);
debug=true node app.js