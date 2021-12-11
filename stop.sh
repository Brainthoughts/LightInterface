#! /bin/bash
pgrep -o -u $(whoami) node >/dev/null
code=$?;
[ $code -eq 0 ] && kill $(pgrep -u $(whoami) node) || echo "node could not be found running as $(whoami)";