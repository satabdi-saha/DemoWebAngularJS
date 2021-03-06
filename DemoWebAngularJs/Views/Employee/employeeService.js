﻿define(['app_routes'], function (app) {

    app.service('empservice', function ($http) {

        this.get = function () {

            this.data = [];

            this.data = $http({
                url: "http://localhost:63452/api/Employee",
                method: "GET",
                //headers: authHeaders
            });

            return this.data;
        };
        this.find = function (id) {

            this.data = [];
            this.data = $http({
                url: "http://localhost:63452/api/Employee",
                method: "GET",
                params: { Id: id },

                //headers: authHeaders
            });
            return this.data;
        };
        this.save = function (modeldata) {

            this.result = 0;
            if (modeldata.EmployeeID == 0) {
                this.result = $http({
                    url: "http://localhost:63452/api/Employee",
                    method: "POST",
                    //dataType: 'json',
                    //model: modeldata, // JSON.stringify(modeldata),
                    data: modeldata

                    //headers: authHeaders
                });
            }
            else {
                this.result = $http({
                    url: "http://localhost:63452/api/Employee",
                    method: "PUT",
                    //dataType: 'json',
                    data: modeldata

                    //headers: authHeaders
                });
            }
            return this.result;
        };
        this.delete = function (id) {

            this.data = [];
            this.data = $http({
                url: "http://localhost:63452/api/Employee",
                method: "DELETE",
                params: { Id: id },

                //headers: authHeaders
            });
            return this.data;
        }
    });

});