meteor-exec
===========
A library to simplify exec calls in meteor

Server-Side Usage
=================
There is a server side variable called Exec. To run a command line program, just call
```js
Exec.run('ls', ['-al','/*'], stdoutHandler, stderrHandler);
```

This is the equivalent of running ```ls -al /*``` from a shell. Exec.run can also handle no arguments array and just including everything in the first argument. Like so:
```js
Exec.run('ls -al /*', stdoutHandler, stderrHandler)
```

*Note that this function is very stupid*. It splits the string on spaces so if you have something in quotes with spaces, do the array thing instead.

See the example in the github respository for some example stdoutHandler and stderrHandler functions (line 50 of exec.js)[https://github.com/jchristman/meteor-exec/blob/master/exec.js#L50]. You then just pass this function handler to the Exec.run instance.

Client-Side Usage
=================
There is a built-in Meteor.method that if called from the client side, will execute the cmd,args that are passed to it. There is a also a built-in collection Exec.Console that will read the stderr and stdin and put lines into the Exec.Console collection. Check the example in the github repository for this usage. Note that you must set the variable ```Exec.allowClientCalls = true``` on the server in order for this work (security purposes).
