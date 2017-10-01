module.exports = {
	'secret': 'bfd29261ade65e32135445b623802596',
	'database': 'mongodb://dashUser:asdf123!@192.168.1.37:27017/dash'
	//'database': 'mongodb://' + process.env.OPENSHIFT_MONGODB_DB_USERNAME  + ':' + process.env.OPENSHIFT_MONGODB_DB_PASSWORD + '@' + process.env.OPENSHIFT_MONGODB_DB_HOST + ':' + process.env.OPENSHIFT_MONGODB_DB_PORT  + '/' + process.env.OPENSHIFT_APP_NAME 
};
