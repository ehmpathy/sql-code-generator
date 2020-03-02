FROM mysql:5.7

ADD wait-for-mysql.sh /root/
RUN chmod +x /root/wait-for-mysql.sh
