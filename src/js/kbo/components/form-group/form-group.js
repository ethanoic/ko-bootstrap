ko.components.register('form-group', {
    viewModel: function(params) {
        //var self = this;
        this.label = params.label;
        this.type = params.type;
        this.placeholder = params.placeholder;
        this.value = params.value;

        this.onChanged = function() {
            params.onChanged();
        };
    },
    template: {
        element: 'form-group-component-template'
    }
});

ko.bindingHandlers.inputOnChanged = {
    init: function(element, valueAccesor, allBindings, viewModel, bindingContext) {
        $(element).on('change', function() {
            viewModel.onChanged();
        });
    }
}