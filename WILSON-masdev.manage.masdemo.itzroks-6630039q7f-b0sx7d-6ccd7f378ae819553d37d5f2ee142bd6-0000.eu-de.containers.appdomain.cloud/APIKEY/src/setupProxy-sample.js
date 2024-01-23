/*
 * Licensed Materials - Property of IBM
 *
 * 5737-M66
 *
 * (C) Copyright IBM Corp. 2020 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */


// // // istanbul ignore file
// // // https://github.com/chimurai/http-proxy-middleware
const proxy = require('http-proxy-middleware');

// change user variable to change users, options are marcia or wilson for now
const user = 'maxadmin'

const creds = {
  miles: 'bWlsZXM6bWlsZXM=',
  cisco: 'Y2lzY286Y2lzY28=',
  jenn: 'amVubjpqZW5u',
  maxadmin: 'bWF4YWRtaW46bWF4YWRtaW4='
}

const userCreds = creds[user]

module.exports = function(app) {
  app.use(proxy('/maximo/**', {
      target: 'http://localhost:7001',

      headers: {
        MAXAUTH: userCreds
      }

    }));
};


/*
 * Licensed Materials - Property of IBM
 * 5737-M66, 5900-AAA
 * (C) Copyright IBM Corp. 2020 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */

// istanbul ignore file
// https://github.com/chimurai/http-proxy-middleware
// Asset-Health-Insights team1    
// const proxy = require('http-proxy-middleware');

// module.exports = function(app) {
//   app.use(proxy('/maximo/**', {
//     target: 'http://health-team21.fyre.ibm.com:9084',
//  //     pathRewrite: {'^/maximo/oslc': '/maximo_123/oslc'},
//       headers: {
//         MAXAUTH: 'amVubjpqZW5u'
//       }
//     }));
// };    

// istanbul ignore file
// const proxy = require('http-proxy-middleware');
// module.exports = function(app) {
//     app.use(proxy('/maximo/oslc/**', {
//         changeOrigin: true,
//         secure: false,
//         target: 'https://masws.health.ivt09rel86.ivt.suite.maximo.com',
//         pathRewrite: {'^/maximo/oslc': '/maximo/api'},
//         // istanbul ignore next
//         onProxyReq: function(proxyReq, req, res) {
//             proxyReq.setHeader('apikey', '7n1okjdknc3e5nhptlmalj7vj5j1ak5ljppehd2t')
//         }
//     }));
// };