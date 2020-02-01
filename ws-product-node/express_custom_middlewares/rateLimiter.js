//middleware that keeps track of users ip and their query count.
//If limits are reached, user will not be able to query.

//rate limits configs
const QUERY_LIMIT = 100;
const TIMEOUT_SECONDS = 4;

//logs users ip with params of count  in an object
const userData = {};

//if rate limits are reached, server will block queries from the ip address.
var rateLimiter = function(req, res, next) {
  userIp = req.connection.remoteAddress;

  if (!userData[userIp]) {
    userData[userIp] = { count: 1 };
  }

  if (userData[userIp].count > QUERY_LIMIT) {
    req.bypass.queryHandler = true;
    res.send(`Query limit reached. User Timeout`);

    setTimeout(() => {
      userData[userIp].count = 1;
    }, TIMEOUT_SECONDS * 1000);
  }
  userData[userIp].count++;

  next();
};

module.exports = rateLimiter;
