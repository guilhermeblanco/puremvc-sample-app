Object.declare('base.widget.Command');

base.widget.Command = function ()
{
    org.puremvc.js.patterns.command.SimpleCommand.call(this);
};

Object.extend(base.widget.Command, org.puremvc.js.patterns.command.SimpleCommand);