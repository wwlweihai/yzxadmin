angular.module('app.controller')
	.controller('caseCategory', caseCategory);
caseCategory.$inject = [
	'Restangular',
	'uiGridConstants',
	'$scope'
];

function caseCategory(Restangular,uiGridConstants,$scope) {
    var categories = Restangular.one('categories.json');
    var exportOpts = {
        exporterCsvFilename: 'myFile.csv',
        exporterPdfDefaultStyle: {fontSize: 9},
        exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
        exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
        exporterPdfHeader: { text: "My Header", style: 'headerStyle' },
        exporterPdfFooter: function ( currentPage, pageCount ) {
            return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
        },
        exporterPdfCustomFormatter: function ( docDefinition ) {
            docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
            docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
            return docDefinition;
        },
        exporterPdfOrientation: 'portrait',
        exporterPdfPageSize: 'LETTER',
        exporterPdfMaxGridWidth: 500,
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),

    };
    //$scope.gridOptions.concat(exportOpts);
    $scope.gridOptions = {
        enableGridMenu: true,
        enableSorting: true,
        enableColumnResizing: true,
        enableHorizontalScrollbar:uiGridConstants.scrollbars.NEVER,
        enableSelectAll: true,
        columnDefs: [
            {field: 'id', displayName: '编号',maxWidth: 80,width: '30%'},
            {field: 'title', displayName: '分类名称',maxWidth: 150},
            {name: 'edit', displayName: '编辑', cellTemplate: '<button type="button" class="btn btn-primary btn-xs" ng-click="edit(row.entity)" >编辑</button> '}
        ],
        onRegisterApi: function(gridApi){
            $scope.gridApi = gridApi;
        }
    };
    angular.merge($scope.gridOptions, exportOpts);

    activate();
	////////////////
	function activate() {
        categories.get().then(function(result){
            $scope.gridOptions.data = result;
        });
	}
};
