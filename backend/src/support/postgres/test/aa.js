/**
 * Created by ypf on 2016/9/27.
 */
var pgManager = require('../lib/manager');
var year = 2016;
var operations = [
  {'$select': {tableName: 'WBS', filter: {year: year}, fields: [], tag: 'wbsList'}},
  {'$select': {tableName: 'PreBooking', filter: {year: year}, fields: [], tag: 'preBookings'}},
  {'$select': {tableName: 'PBModelChannel', filter: {year: year}, fields: [], tag: 'pbModelChannels'}},
  {'$select': {tableName: 'ModelChannel', filter: {year: year}, fields: [], tag: 'modelChannels'}}
];
pgManager.queryWithTransaction(operations, function (err, results) {
  var wbsList = results.wbsList.rows;
  console.log('1',wbsList);
  var preBookings = results.preBookings.rows;
  var pbModelChannels = results.pbModelChannels.rows;
  var modelChannels = results.modelChannels.rows;
  var wbsLength = wbsList.length;
  var pBLength = preBookings.length;
  var pbmcLength = pbModelChannels.length;
  var mcLength = modelChannels.length;
  if (wbsLength > 0) {
    for (var i = 0; i < wbsLength; i++) {
      if (wbsList[i].campaignType == 5) {
        for (var j = 0; j < pbmcLength; j++) {
          if (pbModelChannels[j].id == wbsList[i].PBModelChannelId) {
            var preBookingId = pbModelChannels[j].preBookingId;
            for (var k = 0; k < pBLength; k++) {
              wbsList[i].modelChannelType = preBookings[k].name;
            }
          }
        }
      }
    }
    console.log('2',wbsList);
  } else {
    return gateway.doSend(req, res, {err: '查找WBS出错！'});
  }
})