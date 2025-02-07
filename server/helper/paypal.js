const paypal = require('paypal-rest-sdk');


paypal.configure({
  mode: 'sandbox',
  client_id : 'ATgZHP8_X3SFy-j3dpAPCkecK4yBUXExPADcUtVfZN_OmHXVnaxCmGIjEes0AaMa52P05vljNk4GrFw0',
  client_secret: 'EKGdJgnZwChgZqJvsdSYzfRT2btxGVnr_Uq7jX16bexMpSqOdOyotHPmgJyfQxnU-MKOxgq3Bzzt3Rmw'
});
 
module.exports = paypal; 