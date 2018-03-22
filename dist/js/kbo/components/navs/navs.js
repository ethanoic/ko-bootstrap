// jshint ignore: start
/*
#Navs

allow parameters to set type of nav
    navItems: [{
        text:'',
        href:'',
        active: true|false,
        disabled: true|false,
        childNavItems: [{
            text: '',
            href: '',
            active: true|false,
            disabled: true|false,
            isDivider: true|false
        }]
    }]
    horizontal
        'center' | 'end'
    orientation
        'vertical' | 'horizontal'
    mode
        'tabs' | 'pills'
*/
ko.components.register('navs', {
    viewModel: function(params) {
        var self = this; 
        self.navItems = ko.observableArray([]);
        self.horizontal = ko.observable(params.horizontal || '');
        self.orientation = ko.observable(params.orientation || '');
        self.mode = ko.observable(params.mode || '');
        self.fill = ko.observable(params.fill || false);
        self.role = ko.computed(function() {
            return self.mode() == 'tab' ? 'tablist' : '';
        },this);

        var navItem = function(data) {
            this.text = data.text || '';
            this.href = data.href || '#'; // either to url or tab content
            this.active = ko.observable(data.active || false);
            this.disabled = ko.observable(data.disabled || false);
            this.isDivider = ko.observable(data.isDivider || false);
            this.childNavItems = ko.observableArray([]);
            this.hasDropdown = ko.computed(function() {
                return this.childNavItems().length > 0;
            },this);
            this.dataToggle = ko.computed(function() {
                return this.childNavItems().length > 0 ? 'dropdown' : '';
            }, this);
            if (data.childNavItems)
                data.childNavItems.forEach(function(item) {
                    this.childNavItems.push(new navItem(item));
                });
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
    template: '<ul class="nav" data-bind="foreach: navItems, css: { \'flex-column\': orientation() == \'vertical\', \'justify-content-center\': horizontal() == \'center\',  \'justify-content-end\': horizontal() == \'end\', \'nav-tabs\': mode() == \'tabs\', \'nav-pills\': mode() == \'pills\', \'nav-fill\': fill  }, attr: { role: role }">\
                    <li class="nav-item" data-bind="css: { \'dropdown\': hasDropdown }">\
                        <a class="nav-link" href="#" data-bind="text: text, attr: { href: href, \'data-toggle\': dataToggle }, css: { \'disabled\': disabled, \'active\': active, \'role\': $parent.mode }, css: { \'dropdown-toggle\': hasDropdown }"></a>\
                        <!-- ko if: hasDropdown -->\
                            <div class="dropdown-menu">\
                                <!-- ko foreach: childNavItems -->\
                                    <!-- ko ifnot: isDivider -->\
                                        <a class="dropdown-item" href="#" data-bind="text: text, attr: { href: href }"></a>\
                                    <!-- /ko -->\
                                    <!-- ko if: isDivider -->\
                                        <div class="dropdown-divider"></div>\
                                    <!-- /ko --\
                                <!-- /ko -->\
                            </div>\
                        <!-- /ko -->\
                    </li>\
                </ul>'
});