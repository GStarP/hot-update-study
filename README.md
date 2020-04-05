# Hot Update

## Core

1. observe file changes
2. connect with browser
3. send update info to browser when file changes

## Implement

1. fs.watch
2. websocket
3. TO BE UPDATE

I impl step 3 in a rather stupid way

I connect the server to the ws as well

when file changes, server sends updateInfo to ws, then ws send it to all its connections (including that server)

so you can use id to avoid ws send back info to server, and perhaps observation to files can be directly done in `ws.js`

