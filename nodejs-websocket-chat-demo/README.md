# 
- https://github.com/sitegui/nodejs-websocket

##  服务端
- npm install nodejs-websocket
- node server.js

## nginx配置
使用nginx作为websocket的proxy server,通过设置```proxy_set_header```将HTTP升级至WebSocket。
- 本地nginx配置，线上可做针对修改
```
upstream chat_local
{
	server 127.0.0.1:23000;
}
	
server
{
    listen       80;
    server_name  chat_local.ryoma.com;
	root F:/web/websocket/nodejs-websocket-chat-demo/;

    location / {
		root F:/web/websocket/nodejs-websocket-chat-demo/;
        index index.html  index.php;
    }
	
	location /ws/ {
		proxy_pass    http://chat_local;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection "upgrade";
	}
}
```