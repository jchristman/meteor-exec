if (Meteor.isClient) {
    Template.cmd.helpers({
        'console' : function() {
            return Exec.Console.find();
        }
    });

    Template.cmd.events({
        'submit .cmd' : function(event) {
            var cmd = event.target.cmd.value;
            Meteor.call('exec', cmd);
            event.target.cmd.value = "";
            return false;
        }
    });
}
