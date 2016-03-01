var path = require('path');

var settings = {
  port       : process.env.PORT || 3000,
  database:{
    uri:"mysql://beginning:maox@localhost:3306/beginning",
    options:{

      pool:{
        max:5,
        min:0,
        idle:10000
      }
    }
  }

};

module.exports = settings;
