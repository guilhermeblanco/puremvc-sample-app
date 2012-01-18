Object.declare('base.page.PageMacroCommand');

base.page.PageMacroCommand = function ()
{
    org.puremvc.js.patterns.command.MacroCommand.call(this);
}

Object.extend(base.page.PageMacroCommand, org.puremvc.js.patterns.command.MacroCommand);

var _p = base.page.PageMacroCommand.prototype;

_p._initializeMacroCommand = function ()
{
    // Initialize app-wide generic behavior
    $("html").removeClass("no-js").addClass("js");

    // Initialize app-wide widgets
    this.addSubCommand(base.widget.notifier.Command);
};