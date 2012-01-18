Object.declare('employeeadmin.widget.user.list.ViewComponent');

employeeadmin.widget.user.list.ViewComponent = function (component)
{
    base.widget.ViewComponent.call(this, component);
};

Object.extend(employeeadmin.widget.user.list.ViewComponent, base.widget.ViewComponent);

var _p = employeeadmin.widget.user.list.ViewComponent.prototype;

_p.addUser = function (user)
{
    var $wrapper  = this.getComponent(),
        $template = $($wrapper.find('#user-list-template').html()),
        $listArea = $wrapper.find('#user-list-items'),
        $mailto   = $template.find('.mailto'),
        $remove   = $template.find('.remove_bt');

    // Simplifying item retrieval and search
    $template.attr('data-item', user.name);
    $template.data('item', user);

    // Updating HTML template
    $mailto.html(user.name);
    $mailto.attr('href', 'mailto:' + user.email);

    $remove.bind('click', Relegate.create(this, this._onRemoveButtonClick));

    // Displaying item
    $template.css('display', 'none');
    $listArea.prepend($template);
    $template.slideDown('slow');
};

_p.removeUser = function (user)
{
    var $wrapper  = this.getComponent(),
        $listArea = $wrapper.find('#user-list-items'),
        $item     = $listArea.find('li[data-item="' + user + '"]');

    $item.slideUp('slow', function () {
        $item.remove();
    });
};

_p._onRemoveButtonClick = function (event)
{
    var $item = $(event.target).closest('li'),
        user  = $.data($item[0], 'item');

    if (window.confirm('Are you sure to remove user "' + user.name + '"?')) {
        this.getFacade().sendNotification('USER_REMOVE', user);
    }

    return false;
};