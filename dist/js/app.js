// detect document on load

// global functions

(function() {
    console.log('document on load');
    
    var pageElement = document.getElementById('app');
    var appModel = function() {
        var self = this; // declaring self to this helps to refer to the variables in the object scope
        self.title = ko.observable(config.appTitle);
        self.navItems = ko.observableArray(config.navItems);
    };

    ko.applyBindings(new appModel(), pageElement);
 })();