Object.declare('employeeadmin.page.IndexStartupCommand');

employeeadmin.page.IndexStartupCommand = function ()
{
    base.page.PageMacroCommand.call(this);
};

Object.extend(employeeadmin.page.IndexStartupCommand, base.page.PageMacroCommand);

var _p = employeeadmin.page.IndexStartupCommand.prototype;

_p._initializeMacroCommand = function ()
{
    base.page.PageMacroCommand.prototype._initializeMacroCommand.call(this);

    // Initialize page only widgets here
    this.addSubCommand(employeeadmin.widget.user.form.Command);
    this.addSubCommand(employeeadmin.widget.user.list.Command);
};