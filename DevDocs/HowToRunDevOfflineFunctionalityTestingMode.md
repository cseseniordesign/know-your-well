# HowToRunDevOfflineFunctionalityTestingMode.md

I don't know how the team tested offline functionally before us.  
maybe they had a pipeline to production and were free-wheeling it. idk.  
I'll be caught dead messing with production bruz.

you need 2 terminals open for this. so do that please.  

## files in question: 
1. ```knowyourwell/knowyourwell/ClientApp/serve-build.js```
   1. this is "serving" the server, front end beck end sandwich. 
   2. it' snot like running it on a registered domain or something. so it's not deploying.
2. ```knowyourwell/knowyourwell/Properties/launchSettings.json```
   1. i'm mostly talking about...
      1. ```applicationUrl```
      2. ```sslPort```
   2. i don't know the significance of the number, but in the build command you can specify a port number. so if firefox or chrome says "can't find your webpage" this COULD be why.
3. knowyourwell/knowyourwell/ClientApp/src/setupProxy.js
   6. this also contains a port number setting for some reason >:- (

## commands you must know
```bash
#terminal 1
knowyourwell/knowyourwell> npm run server

#terminal 2
knowyourwell/knowyourwell/ClientApp> npm run build 
# it will build. this takes a few minutes.
knowyourwell/knowyourwell/ClientApp> node serve-build.js
```

any time you changed the program. you need to run ```npm run build``` again.

server-build.js looks for port 5000.  
launchSetting.json builds for port 5000.  
if you mess with either of these your browser won't know what you're talking about.  