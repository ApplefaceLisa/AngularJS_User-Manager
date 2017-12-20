angular.module("customServices", [])
.factory("pagerService", function() {
    // service definition
    var service = {};
    service.getPager = getPager;
    return service;

    // service implementation
    /* generate array of number from start(inclusive) to end(inclusive) */
    function range(start, end) {
        return Array.from(Array(end-start+1), (_, i) => start + i);
    }

    /* @totalItems : total number
     * @currentPage
     * @pageSize
    */
    function getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 10;

        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);

        /* for delete users */
        if (currentPage > totalPages) {
            currentPage = currentPage > 1 ? currentPage - 1 : 1;
        }

        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = range(startPage, endPage);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
})
.factory("userMngService", [function() {
    /* users array, all add/edit/delete operation do to this array */
    var users = [
        {id:1, fName:'Hege',  lName:"Pege", title:"Software Engineer", gender:"male", age:22},
        {id:2, fName:'Kim',   lName:"Pim", title:"Principle", gender:"female", age:45},
        {id:3, fName:'Sal',   lName:"Smith", title:"Project Manager", gender:"male", age:35 },
        {id:4, fName:'Jack',  lName:"Jones", title:"Senior Engineer", gender:"male", age:32 },
        {id:5, fName:'John',  lName:"Doe", title:"ME", gender:"male", age:30 },
        {id:6, fName:'Peter', lName:"Pan", title:"blacksmith", gender:"male", age:19 }/*,
        {id:7, fName:'Hege',  lName:"Pege", title:"Software Engineer", gender:"male", age:22},
        {id:8, fName:'Kim',   lName:"Pim", title:"Principle", gender:"female", age:45},
        {id:9, fName:'Sal',   lName:"Smith", title:"Project Manager", gender:"male", age:35 },
        {id:10, fName:'Jack',  lName:"Jones", title:"Senior Engineer", gender:"male", age:32 },
        {id:11, fName:'John',  lName:"Doe", title:"ME", gender:"male", age:30 },
        {id:12, fName:'Peter', lName:"Pan", title:"blacksmith", gender:"male", age:19 },
        {id:13, fName:'Hege',  lName:"Pege", title:"Software Engineer", gender:"male", age:22},
        {id:14, fName:'Kim',   lName:"Pim", title:"Principle", gender:"female", age:45},
        {id:15, fName:'Sal',   lName:"Smith", title:"Project Manager", gender:"male", age:35 },
        {id:16, fName:'Jack',  lName:"Jones", title:"Senior Engineer", gender:"male", age:32 },
        {id:17, fName:'John',  lName:"Doe", title:"ME", gender:"male", age:30 },
        {id:18, fName:'Peter', lName:"Pan", title:"blacksmith", gender:"male", age:19 }*/];

    /* basic operations : add new user / get user by Id / edit user / delete user */
    var user_id = users.length + 1;

    function createUser(usrObj) {
        usrObj.id = user_id++;
        users.push(usrObj);
    }

    function getUserById(usrId) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].id === usrId) {
                return users[i];
            }
        }
    }

    function updateUser(usrObj) {
        var id = usrObj.id;
        for (var i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                users[i] = usrObj;
                break;
            }
        }
    }

    function deleteUser(usrId) {
        var index = users.length;
        for (var i = 0; i < users.length; i++) {
            if (users[i].id === usrId) {
                index = i;
                break;
            }
        }
        users.splice(index, 1);
    }

    var status = {
        pagesize : 10,
        currentpage : 1
    }

    function changePagesize(size) {
        status.pagesize = size || 10;
        status.currentpage = 1;
    }

    function changePage(page) {
        status.currentpage = page;
        console.log("change current page "+page);
    }

    /*********************************************************************/
    var service = {};

    service.userlist = users;
    service.pagestatus = status;

    service.newUser = createUser;
    service.editUser = updateUser;
    service.deleteUser = deleteUser;
    service.getUserById = getUserById;
    service.changePage = changePage;
    service.changePagesize = changePagesize;

    return service;
}]);