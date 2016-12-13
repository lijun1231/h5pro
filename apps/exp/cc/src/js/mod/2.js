(function() {
    var root=this;
    var _={
        name:"lijun",
        age:24
    }
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }
}).call(this);
