Object.declare('employeeadmin.widget.user.form.ViewComponent');

employeeadmin.widget.user.form.ViewComponent = function (component)
{
    base.widget.ViewComponent.call(this, component);

    this._initialize();
};

Object.extend(employeeadmin.widget.user.form.ViewComponent, base.widget.ViewComponent);

var _p = employeeadmin.widget.user.form.ViewComponent.prototype;

_p._initialize = function ()
{
    var $form = this.getComponent();

    $form.bind('submit', function () {return false;});

    // This could be optimized also into a ViewComponent private function
    $form.find('input[type="submit"],input[type="image"]').bind(
        'click', Relegate.create(this, this._onFormSubmit)
    );
};

_p._onFormSubmit = function ()
{
    var $form    = this.getComponent(),
        formData = $form.serializeJSON();

    this.getFacade().sendNotification('USER_ADD', formData, 'view');

    return false;
};

_p.resetForm = function ()
{
    var $form = this.getComponent();

    $form[0].reset();
};