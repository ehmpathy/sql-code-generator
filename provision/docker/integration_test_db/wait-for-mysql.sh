#!/bin/sh
# wait until MySQL is really available
maxcounter=45

counter=1
while ! mysql --protocol TCP -u"root" -p"$MYSQL_ROOT_PASSWORD" -e "show databases;" > /dev/null 2>&1; do
    sleep 1
    counter=`expr $counter + 1`
    if [ $counter -gt $maxcounter ]; then
        >&2 echo "we have been waiting for MySQL too long already; failing"
        exit 1
    fi;
done
echo "connected to mysql instance successfuly"
