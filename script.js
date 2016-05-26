var request = require('request');
var cheerio = require('cheerio');
var nodemailer = require('nodemailer');
 
// create reusable transporter object using the default SMTP transport 
var transporter = nodemailer.createTransport({
service: 'Gmail',
auth: {
    user: 'aseemgupta2625@gmail.com',
    pass: '[your_application_spefic_password]'
}
});

/*Setup e-mail data with unicode symbols*/ 
var mailOptions = {
    from: '"Aseem Gupta 👥" <aseem@localhost.com>', // sender address 
    to: 'aseemgupta2625@gmail.com[,more_emails_comma_separated], // list of receivers 
    subject: 'Hello ✔', // Subject line 
    text: 'Things are Great. VR IS AVAILABLE NOW.. 🐴', // plaintext body 
    html: '<b>Hello world 🐴</b>' // html body 
};
 
/*Send email based on parameters*/
function sendEmail() {
 	console.log("SENDING EMAIL");
	// send mail with defined transport object 
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
	});
}

/*Analyze fetched html*/
function analyzeHTML(html) {
	var time = new Date();
	$ = cheerio.load(html);
	var status = $('.supply').find('span').text() == 'Out of stock';
	console.log("STATUS:", status);
	console.log('TIME STAMP:', time,'\n');

	if(status) {
		sendEmail();
	}
	// console.log($('.js-add-to-cart'));
	// console.log($('.js-add-to-cart').prop('disabled', true) || $('.js-add-to-cart').is(':disabled'));
}

/*Fetches html from website*/
function requestWebsite() {
	request('https://oneplus.net/oneplus-loop-vr', function (error, response, html) {
	
		if (!error && response.statusCode == 200) {
		analyzeHTML(html);
		}
	});	
}

setInterval(requestWebsite, 600000);
