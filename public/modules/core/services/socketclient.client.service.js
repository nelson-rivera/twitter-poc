'use strict';

//socket factory that provides the socket service
angular.module('core').factory('Socket', ['socketClient',
    function(socketClient) {
        return socketClient({
            prefix: '',
            ioSocket: io.connect('http://localhost:3000')
        });
    }
]);