FROM node:latest
COPY server /app/server
COPY web /app/web
RUN npm install -g json-server 



WORKDIR /app
VOLUME /data
    
ENTRYPOINT ["json-server" , "-p", "9001", "--watch", "/app/server/db.json", "./json-server.log", "2>&1", "</dev/null", "&"]

EXPOSE 9001    

