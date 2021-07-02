
class Authentication {
    constructor() {
        this.authenticated = false;
    }
    authenticate() {
        this.authenticated = true;
    }
};

export var AuthController = (function () {
    var instance;

    function createInstance() {
        var object = new Authentication();
        return object;
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();