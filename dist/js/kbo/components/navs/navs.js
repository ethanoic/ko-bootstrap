// jshint ignore: start
/*
#Navs

allow parameters to set type of nav
    
*/
ko.components.register('navs', {
    viewModel: function(params) {
        var self = this; 
        self.navItems = ko.observableArray([]);

        var navItem = function(data) {
            this.text = data.text || '';
            this.href = data.href || '#';
            this.active = ko.observable(data.active || false);
            this.disabled = ko.observable(data.disabled || false);
        };

        if (ko.isObservable(params.navItems)) {
            params.navItems().forEach(function(item) {
                self.navItems.push(new navItem(item));
            });
        } else {
            params.navItems.forEach(function(item) {
                self.navItems.push(new navItem(item));
            });
        }
    },
    template: '<ul class="nav" data-bind="foreach: navItems">\
                    <li class="nav-item">\
                        <a class="nav-link" href="#" data-bind="text: text, attr: { href: href }, css: { \'disabled\': disabled, \'active\': active }"></a>\
                    </li>\
                </ul>'
});