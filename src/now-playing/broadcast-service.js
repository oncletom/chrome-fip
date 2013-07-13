"use strict";

/* globals angular, Broadcast */

angular.module('BroadcastService', ['ChromeService'])
  .factory('Broadcasts', function broadcastFactory($http, $compile){
    return {
      "get": function(){
        return $http.get(Broadcast.defaultUri, {params:{_: Date.now()}})
          .then(function broadcastHttpGetSuccess(response){
            var nodes, html;

            //removing the default assets call (typically, the default album cover)
            html = response.data.html;
            html = html.replace(/\/sites\/[^"]+\.(png|jpe?g|gif)/mg, "");

            nodes = $compile(html)({});

            return Broadcast.parseHtmlResponse(nodes.find("div"));
          });
      }
    };
  });