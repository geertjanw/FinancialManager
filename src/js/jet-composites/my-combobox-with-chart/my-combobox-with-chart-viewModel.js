/**
 Copyright (c) 2015, 2018, Oracle and/or its affiliates.
 The Universal Permissive License (UPL), Version 1.0
 */
'use strict';
define(
        ['knockout', 'jquery',
            'ojL10n!./resources/nls/my-combobox-with-chart-strings',
            'ojs/ojchart', 'ojs/ojselectcombobox'], function (ko, $, componentStrings) {

    function ExampleComponentModel(context) {

        var self = this;
        
        self.res = componentStrings;

        //At the start of your viewModel constructor
        var busyContext = oj.Context.getContext(context.element).getBusyContext();
        var options = {"description": "CCA Startup - Waiting for data"};
        self.busyResolve = busyContext.addBusyState(options);

        self.composite = context.element;

        //Example observable
        self.val = ko.observable(context.properties.chartType);

        //Let the outside world know the property has been reset:
        self.val.subscribe(function () {
            self.properties.setProperty("chartType", self.val());
        });

        /* toggle button variables */
        self.stackValue = ko.observable('off');
        self.orientationValue = ko.observable('vertical');

        /* chart data */
//        var barSeries = [{name: "Series 1", items: [42, 34]},
//            {name: "Series 2", items: [55, 30]},
//            {name: "Series 3", items: [36, 50]},
//            {name: "Series 4", items: [22, 46]},
//            {name: "Series 5", items: [22, 46]}];

        var barGroups = ["Group A", "Group B"];

        self.barSeriesValue = ko.observableArray(context.properties.chartData);
        self.barGroupsValue = ko.observableArray(barGroups);
        self.properties = context.properties;
        self.res = componentStrings['my-combobox-with-chart'];
        // Example for parsing context properties
        // if (context.properties.name) {
        //     parse the context properties here
        // }

//        self.pie = ko.observable(oj.Translations.getTranslatedString('res.my-combobox-with-chart.pie'));

        self.selectedLangInComponent = ko.observable(oj.Config.getLocale());

        document.addEventListener("localeListener", function () {
            self.selectedLangInComponent(oj.Config.getLocale());
//           self.res(componentStrings);

//            self.res(componentStrings);
        });

        //Once all startup and async activities have finished, relocate if there are any async activities
        self.busyResolve();
    }
    ;

    //Lifecycle methods - uncomment and implement if necessary 
    //ExampleComponentModel.prototype.activated = function(context){
    //};

    //ExampleComponentModel.prototype.connected = function(context){
    //};

    //ExampleComponentModel.prototype.bindingsApplied = function(context){
    //};

    //ExampleComponentModel.prototype.disconnect = function(context){
    //};

    //ExampleComponentModel.prototype.propertyChanged = function(context){
    //};

    return ExampleComponentModel;
});