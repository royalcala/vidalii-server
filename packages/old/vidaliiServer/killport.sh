#!/bin/bash
echo "welcome killing the port"
#ls
#get the pid
lsof -ti:4000
fuser 4000/tcp
fuser -k 4000/tcp
echo "port killed 4000:fuser -k 4000/tcp"