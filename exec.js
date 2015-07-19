Exec = {};

if (Meteor.isServer) {
    var Process = Npm.require('child_process');

    Exec.allowClientCalls = false; // Change this to true to make the Meteor.methods('exec','') work
    Exec.run = function (command, args, stdoutHandler, stderrHandler) {
        var proc = Process.spawn(command, args, {
            detached : true,
            stdio : ['pipe', 'pipe', 'pipe']
        });

        proc.unref();

        stdoutHandler && proc.stdout.on('data', Meteor.bindEnvironment(function (data) {
            stdoutHandler(data.toString());
        }));

        stderrHandler && proc.stderr.on('data', Meteor.bindEnvironment(function (data) {
            stderrHandler(data.toString());
        }));

        stdoutHandler && proc.on('close', Meteor.bindEnvironment(function (code) {
            stdoutHandler("Child process exited with code: " + code.toString());
        }));

        return function(data) {
            proc.stdin.write(data);
            proc.stdin.end();
        }
    };

    Meteor.methods({
        exec : function(cmd, args) {
            if (Exec.allowClientCalls) {
                if (args === undefined) {
                    cmd = cmd.split(' ')
                    return Exec.run(cmd[0], cmd.slice(1, cmd.length), Exec.Console.Insert, Exec.Console.Insert);
                } else {
                    return Exec.run(cmd, args.split(' '), Exec.Console.Insert, Exec.Console.Insert);
                }
            } else {
                console.error('Set Exec.allowClientCalls=true to run Meteor.call("exec",...)');
            }
        }
    });
}

Exec.Console = new Meteor.Collection('Exec_Console');
Exec.Console.Insert = function(data) {
    data.split('\n').forEach(function(_data) {
        if (_data !== "") {
            Exec.Console.insert({
                timestamp : new Date().getTime(),
                data : _data
            });
        }
    });
}

if (Meteor.isServer) {
    Meteor.publish('Exec_Console', function() { return Exec.Console.find(); });
} else {
    Meteor.subscribe('Exec_Console');
}
