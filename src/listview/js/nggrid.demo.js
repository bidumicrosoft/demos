'use strict';

window.name = "NG_DEFER_BOOTSTRAP!";

require(['angular', 'ngRoute', 'ngGrid'], function (angular) {
    var testData = [
            {name: "Moroni", age: 50},
            {name: "Tiancum", age: 43},
            {name: "Jacob", age: 27},
            {name: "Nephi", age: 29},
            {name: "Enos", age: 34}
    ];

    var app = angular.module('ngGridDemoApp', ['ngRoute', 'ngGrid']);

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
        .when('/selection',
        {
            templateUrl: 'selection.html',
            controller: 'containerController'
        })
        .when('/template',
        {
            templateUrl: 'template.html',
            controller: 'containerController'
        });
    }]);

    app.controller('containerController', function($scope) {
    });

    app.controller('singleSelectionController', function($scope) {
        $scope.testData = testData;
        $scope.gridOptions = {
            data: 'testData',
            multiSelect: false,
        };
    });

    app.controller('multipleSelectionController', function($scope) {
        $scope.testData = testData;
        $scope.gridOptions = {
            data: 'testData',
            multiSelect: true,
        };
    });

    app.controller('cellSelectionController', function($scope) {
        $scope.testData = testData;
        $scope.gridOptions = {
            data: 'testData',
            multiSelect: false,
            enableCellSelection: true,
            enableRowSelection: false,
        };
    });

    app.run(['$templateCache', function ($templateCache) {
        $templateCache.put('selection.html',
            '<div>Single selection</div><div class="gridStyle" ng-controller="singleSelectionController" ng-grid="gridOptions"></div>'
            + '<div>Multiple selection</div><div class="gridStyle" ng-controller="multipleSelectionController" ng-grid="gridOptions"></div>'
            + '<div>Cell selection</div><div class="gridStyle" ng-controller="cellSelectionController" ng-grid="gridOptions"></div>'
        );
    }]);

    app.controller('cellTemplateController', function($scope) {
        $scope.testData = testData;
        $scope.gridOptions = {
            data: 'testData',
            multiSelect: false,
            columnDefs: [
                {field: 'name', displayName: 'Name'},
                {field:'age', displayName:'Age', cellTemplate: '<div class="ngCellText"><input value="{{row.getProperty(col.field)}}"></input></div>'}]
        };
    });

    app.controller('rowTemplateController', function($scope) {
        $scope.testData = testData;
        $scope.gridOptions = {
            data: 'testData',
            multiSelect: false,
            rowHeight: 90,
            rowTemplate:'<div style="height: 100%" ng-style="{ \'cursor\': row.cursor }"><div ng-repeat="col in renderedColumns">{{row.getProperty(col.field)}}</div><button ng-click="row.entity.name = row.entity.name + \' - changed\'">change</button><button ng-click="$parent.testData=[]">remove</button></div>'
        };
    });

    app.run(['$templateCache', function ($templateCache) {
        $templateCache.put('template.html',
            '<div>Single selection</div><div class="gridStyle" ng-controller="cellTemplateController" ng-grid="gridOptions"></div>'
            + '<div>Multiple selection</div><div class="gridStyle" ng-controller="rowTemplateController" ng-grid="gridOptions"></div>'
        );
    }]);

    angular.bootstrap(document, ['ngGridDemoApp']);
});

