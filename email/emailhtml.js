'use strict';

 var ejs = require('ejs');
 var fs = require('fs');
 var registerHtml = fs.readFileSync(__dirname + '/register.ejs', 'utf8');
 var forgotPasswordHtml = fs.readFileSync(__dirname + '/forgotpassword.ejs', 'utf8');
 var passwordChangeHtml = fs.readFileSync(__dirname + '/passwordchange.ejs', 'utf8');
 var html5Email = fs.readFileSync(__dirname + '/html5Email.ejs', 'utf8');
 var IndividualHtml5Email = fs.readFileSync(__dirname + '/individualEmailHTML5.ejs', 'utf8');
 var applicationSubmitted = fs.readFileSync(__dirname + '/applicationsubmittedemail.ejs', 'utf8');

var postmark = require("postmark");
var client = new postmark.Client("7dad6ecb-3e78-4232-9bed-e14863bcd6c1");

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

      if('applicationsubmittedemail' == templateName){
        template = applicationSubmitted;
        action_url ='http://www.advancedsei.com/forgotpassword/reset/'+id+'/'+email;
         subject = 'Application Received.';
      }

        var emailString =   ejs.render(template, {
            "firstName": firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase(),"lastName":lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase(),"action_url":action_url
          });   

          //console.log(emailString) ;                   
         client.sendEmail({
                        "From": "team@advancedsei.com",
                        "To": email,
                        "Subject": subject, 
                        "HtmlBody": emailString,
                        "TrackOpens": true });
    },
sendGenericEmail: function(templateName,subject,body,email,name) {
      var template = '';
      var action_url = 'http://www.advancedsei.com';

      if('generic' == templateName){
              template = html5Email;
            }
      if('individual' == templateName){
              template = IndividualHtml5Email;
            }
            
       var emailString =   ejs.render(template, {
                  "name":name,"body":body,"action_url":action_url
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