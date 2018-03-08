// jshint ignore: start
/*
#Alerts

allow parameters to set type of alert
    
*/
ko.components.register('alerts', {
    viewModel: function(params) {
        //console.log('component init: alerts', params); 
        var self = this;
        self.content = ko.observable(params.content || '');
        self._context = ko.observable(params.context || 'default');
        self.context = ko.computed(function() {
            return 'alert-' + self._context();
        },this);
    },
    template: '<div class="alert" role="alert" data-bind="html: content, css: context"></div>'
});