app.controller("listUserController", ["$scope", "$location", "userMngService", "pagerService", function($scope, $location, userMngService, pagerService) {
    $scope.users = userMngService.userlist;

    $scope.pageSize = userMngService.pagestatus.pagesize;
    $scope.currentpage = userMngService.pagestatus.currentpage;
    $scope.pager = pagerService.getPager($scope.users.length, $scope.currentpage, $scope.pageSize);

    console.log("current page "+$scope.currentpage);

    function changePagesize(size) {
        userMngService.changePagesize($scope.pageSize);
        $scope.pageSize = userMngService.pagestatus.pagesize;
        $scope.currentpage = userMngService.pagestatus.currentpage;
        $scope.pager = pagerService.getPager($scope.users.length, $scope.currentpage, $scope.pageSize);
    }

    $scope.$watch('pageSize', function() {
        if ($scope.pageSize !== userMngService.pagestatus.pagesize)
            changePagesize($scope.pageSize);
    });

    $scope.$watch('currentpage', function() {
        if ($scope.currentpage !== userMngService.pagestatus.currentpage)
            userMngService.changePage($scope.currentpage);
    });

    $scope.setPage = function(page) {
        if (page < 1 || page > $scope.pager.totalPages) {
          return;
        }

        $scope.currentpage = page;
        $scope.pager = pagerService.getPager($scope.users.length, $scope.currentpage, $scope.pageSize);
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
        $scope.reverse = ($scope.propertyName === name) ? !$scope.reverse : false;
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
        $scope.users = userMngService.userlist;
        $scope.pager = pagerService.getPager($scope.users.length, $scope.currentpage, $scope.pageSize);
        $scope.currentpage = $scope.pager.currentPage;
        console.log($scope.currentpage);
        console.log($scope.pager);
        $location.path("/");
    }
}]);