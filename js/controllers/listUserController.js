app.controller("listUserController", ["$scope", "$location", "userMngService", function($scope, $location, userMngService) {
    $scope.pageSize = userMngService.getPagesize();
    $scope.userlist = userMngService.getUserlist();
    $scope.pager = userMngService.getPager();
    $scope.totalItems = userMngService.getTotalItems();

    $scope.$watch('pageSize', function() {
        userMngService.setPagesize($scope.pageSize);
        $scope.userlist = userMngService.getUserlist();
        $scope.pager = userMngService.getPager();
    });

    $scope.setPage = function(page) {
        userMngService.setPage(page);
        $scope.userlist = userMngService.getUserlist();
        $scope.pager = userMngService.getPager();
    };

    /*
    console.log("host: "+ $location.host());
    console.log("port: " + $location.port());
    console.log("url: " + $location.absUrl());
    */

    $scope.searchKey = "";
    $scope.propertyName = "";
    $scope.reverse = false;
    $scope.sortBy = function(name) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = name;
    }

    $scope.createUser = function($event) {
        $event.preventDefault();
        $location.path("/new");
    }

    $scope.editUser = function($event, userId) {
        $event.preventDefault();
        var url = "/edit/" + userId;
        $location.path(url);
    }

    $scope.deleteUser = function($event, userId) {
        $event.preventDefault();
        userMngService.deleteUser(Number(userId));
        $scope.userlist = userMngService.getUserlist();
        $scope.pager = userMngService.getPager();
        $scope.totalItems = userMngService.getTotalItems();
        $location.path("/");
    }
}]);