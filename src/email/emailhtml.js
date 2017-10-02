'use strict';

 var ejs = require('ejs');
 var fs = require('fs');
 var registerHtml = fs.readFileSync(__dirname + '/register.ejs', 'utf8');
 var forgotPasswordHtml = fs.readFileSync(__dirname + '/forgotpassword.ejs', 'utf8');
 var passwordChangeHtml = fs.readFileSync(__dirname + '/passwordchange.ejs', 'utf8');
var postmark = require("postmark");
var client = new postmark.Client("ecf1725d-37da-4aed-81eb-99f92e0af9cb");

module.exports = {
    sendEmail: function(templateName,firstName,lastName,email,id) {
      var template = '';
      var action_url = '';
      var subject = '';
      if('register' == templateName){
        template = registerHtml;
        action_url = 'http://www.advancedsei.com/activate?token_id='+id+'&email='+email;
        subject = 'Account activation';
      }
      if('forgotpassword' == templateName){
        template = forgotPasswordHtml;
        action_url ='http://www.advancedsei.com/forgotpassword/reset/'+id+'/'+email; 
         subject = 'Reset password';
      }

      if('passwordchange' == templateName){
        template = passwordChangeHtml;
        action_url ='http://www.advancedsei.com/forgotpassword/reset/'+id+'/'+email; 
         subject = 'Your password has been changed';
      }

        var emailString =   ejs.render(template, {
            "firstName": firstName,"lastName":lastName,"action_url":action_url
          });   

          //console.log(emailString) ;                   
         client.sendEmail({
                        "From": "team@advancedsei.com",
                        "To": email,
                        "Subject": subject, 
                        "HtmlBody": emailString,
                        "TrackOpens": true });
    }
};