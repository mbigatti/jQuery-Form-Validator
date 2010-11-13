(function($){
	$.extend($.fn, {	
		validate : function(language, settings){
        	
			/*
			 * Locale
			 */
			var lang = {
					errorTitle : 'Form submission not valid',
					requiredFields : 'You have not answered all required fields',
					badTime : 'You have not given a correct time',
					badEmail : 'You have not given a correct e-mail a',
					badTelephone : 'You have not given a correct phone number',
					badSecurityAnswer : 'You have not given a correct answer to the security question',
					badDate : 'You have not given a correct date',
					toLongStart : 'You have given an answer longer then ',
					toLongEnd : ' characters',
					toShortStart : 'You have given an answer shorter then ',
					toShortEnd : ' characters',
					badTime : 'You have not given a correct time',
					somethingWrong : 'Something went wrong!',
					notConfirmed : 'Values could not be confirmed',
					badDomain : 'Incorrect domain value',
					badUrl : 'Incorrect url value',
					badFloat : 'Incorrect float value'
				};
	        
			
			/*
			 * Config
			 */
			var config = {
					ignore : [], // Names of inputs not to be validated even though class attribute tells us to
					errorElementClass : 'error', // Class that will be put on elements whitch value is invalid
					borderColorOnError : 'red', // Border color of elements whitch value is invalid, empty string to not change border color
					errorMessageClass : 'jquery_form_error_message' // 
				};
			
			/*
			 * Extends inital settings
			 */
	        if(settings) 
	        	$.extend(config, settings);
	        if(language)
	        	$.extend(lang, language);
	        
	        
	        /**
	         * Tells whether or not to validate element with this name and of this type
	         * @param string name
	         * @param string type
	         * @return boolean
	         */
	        var ignoreInput = function(name, type) {
	        	if(type == 'submit')
	        		return true;
	        	
	        	for(var i=0; i < config.ignore.lenght; i++) {
	        		if(config.ignore[i] == name)
	        			return true;
	        	}
	        	
	        	return false;
	        };
	        
	        /**
	         * <input class="length12" /> => getAttribute($(element).attr('class'), 'length') = 12
	         * @param string classValue
	         * @param string attributeName
	         * @returns integer
	         */
	        var getAttributeInteger = function(classValue, attributeName) {
	        	var regex = new RegExp('('+attributeName+'[0-9]+)', "g");
	        	return classValue.match(regex)[0].replace(/[^0-9]/g, '');
	        };
	        
	        /** Error messages for this validation */
	        var errorMessages = [];
	        
	        /** Input elements whitch value wasnt valid */
	    	var errorInputs = [];
	    	
	    	/** Default border color on elements when valid */
	    	var defaultBorderColor = null;
	        
	    	/*
	    	 * Validate element values
	    	 */
	        $(this).find('input,textarea').each(function() {
	        	if(!ignoreInput($(this).attr('name'), $(this).attr('type'))) {
	        		
	        		// memorize border color
	        		if(defaultBorderColor == null)
	        			defaultBorderColor = $(this).css('border-color');
	        			
	        		var value = jQuery.trim($(this).val());
	        		var classes = $(this).attr('class');
	        		
	        		// Required
	        		if(classes.indexOf('required') > -1 && value == '') {
	        			errorInputs.push($(this));
	        			if(jQuery.inArray(lang.requiredFields, errorMessages) < 0)
	        				errorMessages.push(lang.requiredFields);
	        		}
	        		
	        		// Min length
	        		if(classes.indexOf('validate_min_length') > -1 && value.length < getAttributeInteger(classes, 'length')) {
	        			errorInputs.push($(this));
	        			var mess = lang.toShortStart +getAttributeInteger(classes, 'length')+ lang.toShortEnd;
	        			if(jQuery.inArray(mess, errorMessages) < 0)
	        				errorMessages.push(mess);
	        		}
	        		
	        		// Max length
	        		if(classes.indexOf('validate_max_length') > -1 && value.length > getAttributeInteger(classes, 'length')) {
	        			errorInputs.push($(this));
	        			var mess = lang.toLongStart +getAttributeInteger(classes, 'length')+ lang.toLongEnd;
	        			if(jQuery.inArray(mess, errorMessages) < 0)
	        				errorMessages.push(mess);
	        		}
	        		
	        		// Email
	        		if(classes.indexOf('validate_email') > -1 && !jQueryFormValidator.validateEmail(value)) {
	        			errorInputs.push($(this));
	        			if(jQuery.inArray(lang.badEmail, errorMessages) < 0)
	        				errorMessages.push(lang.badEmail);
	        		}
	        		
	        		// Domain
	        		if(classes.indexOf('validate_domain') > -1 && !jQueryFormValidator.validateDomain(value)) {
	        			errorInputs.push($(this));
	        			if(jQuery.inArray(lang.badDomain, errorMessages) < 0)
	        				errorMessages.push(lang.badDomain);
	        		}
	        		
	        		// Url
	        		if(classes.indexOf('validate_url') > -1 && !jQueryFormValidator.validateUrl(value)) {
	        			errorInputs.push($(this));
	        			if(jQuery.inArray(lang.badUrl, errorMessages) < 0)
	        				errorMessages.push(lang.badUrl);
	        		}
	        		
	        		// Float
	        		if(classes.indexOf('validate_float') > -1 && !jQueryFormValidator.validateFloat(value)) {
	        			errorInputs.push($(this));
	        			if(jQuery.inArray(lang.badFloat, errorMessages) < 0)
	        				errorMessages.push(lang.badFloat);
	        		}
	        		
	        		// Time
	        		if(classes.indexOf('validate_time') > -1 && !jQueryFormValidator.validateTime(value)) {
	        			errorInputs.push($(this));
	        			if(jQuery.inArray(lang.badTime, errorMessages) < 0)
	        				errorMessages.push(lang.badTime);
	        		}
	        		
	        		// Date
	        		if(classes.indexOf('validate_date') > -1 && !jQueryFormValidator.validateDate(value)) {
	        			errorInputs.push($(this));
	        			if(jQuery.inArray(lang.badDate, errorMessages) < 0)
	        				errorMessages.push(lang.badDate);
	        		}
	        		
	        		// Birthdate
	        		if(classes.indexOf('validate_birthdate') > -1 && !jQueryFormValidator.validateBirthdate(value)) {
	        			errorInputs.push($(this));
	        			if(jQuery.inArray(lang.badDate, errorMessages) < 0)
	        				errorMessages.push(lang.badDate);
	        		}
	        	}
	        });
	        
	        // Reset style and remove error class
	        $(this).find('input,textarea')
	        	.css('border-color', defaultBorderColor)
	        	.removeClass(config.errorElementClass);
	        
	        // Remove possible error message from last validation
	        $('.'+config.errorMessageClass).remove();
	        
	        // Not valid
	        if(errorInputs.length > 0) {
	        	
	        	// Create error message
	        	var messages = '<strong>'+lang.errorTitle+'</strong>';
	        	for(var i=0; i < errorMessages.length; i++)
	        		messages += '<br />* '+errorMessages[i];
	        	
	        	// Show error message
	        	$(this).children().eq(0).prepend('<p class="'+config.errorMessageClass+'">'+messages+'</p>');
	        	
	        	// Apply error style to invalid inputs
	        	for(var i=0; i < errorInputs.length; i++) {
	        		if(config.borderColorOnError != '')
	        			errorInputs[i].css('border-color', config.borderColorOnError);
	        		errorInputs[i].addClass(config.errorElementClass);
	        	} 
	        	
	        	return false;
	        }	        
	        
	        return true;
	   }
	    
	});
    
})(jQuery);


/**
 * Namespace for helper functions
 */
jQueryFormValidator = {};

/**
 * Validate email
 * @return boolean
 */
jQueryFormValidator.validateEmail = function(email)
{
	// TODO: is this regexp enough for validating email correct?
	emailFilter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
	return emailFilter.test(email) ? true : false;
};

/**
 * Validate phonenumber, atleast 7 digits only one hifen and plus allowed
 * @return boolean
 */
jQueryFormValidator.validatePhoneNumber = function(tele)
{
	numPlus = tele.match(/\+/g);
	numHifen = tele.match(/-/g);
	if((numPlus != null && numPlus.length > 1) || (numHifen != null && numHifen.length > 1))
		return false;
	
	if(numPlus != null && tele.indexOf('+') != 0)
		return false;
		
	tele = tele.replace(/([-|\+])/g, '');
	if(tele.length < 8)
		return false;
	if(tele.match(/[^0-9]/g) != null)
		return false;
	
	return true;
};

/**
 * Validate that string is a swedish telephone number
 * @param number
 * @return boolean
 */
jQueryFormValidator.validateSwedishMobileNumber = function(number)
{
	if(!jQueryFormValidator.validatePhoneNumber(number))
		return false;
	
	number = number.replace(/[^0-9]/g, '');
	begin = number.substring(0, 3);
	if(number.length != 10 && begin != '467')
		return false;
	else if(number.length != 11 && begin == '467')
		return false;
	
	if(begin == '070' || begin == '073' || (begin == '467' && number.substr(3,1) == '0'))
		return true;
	else
		return false;
};

/**
 * Is this a valid birth date YYYY-MM-DD
 * @return boolean
 */
jQueryFormValidator.validateBirthdate = function(val)
{
	if(!this.validateDate(val))
		return false;
	
	d = new Date();
	currentYear = d.getFullYear();
	year = parseInt(val.substring(0, 4));
	
	if(year > currentYear || year < (currentYear - 122))
		return false;
	
	return true;
};

/**
 * Is it a correct date YYYY-MM-DD
 * @return boolean
 */
jQueryFormValidator.validateDate = function(val)
{
	// enklast m�jliga...
	if(val.match(/^(\d{4})\-(\d{2})\-(\d{2})$/) == null) 
		return false;
	
	month = val.substring(5, 8);
	day = val.substring(8, 11);
	
	// skum fix. �r talet 05 eller l�gre ger parseInt r�tt int annars f�r man 0 n�r man k�r parseInt?
	if(month.indexOf('0') == 0)
		month = month.replace('0', '');
	if(day.indexOf('0') == 0)
		day = day.replace('0', '');
	
	month = parseInt(month);
	day = parseInt(day);
	
	if(month == 2 && day > 28 || month > 12 || month == 0)
		return false;
	if((this.isShortMonth(month) && day > 30) || 
			(!this.isShortMonth(month) && day > 31) || day == 0)
		return false;

	return true;
};

/**
 * Validate time HH:mm
 */
jQueryFormValidator.validateTime = function(time)
{
	if(time.match(/^(\d{2}):(\d{2})$/) == null) 
		return false;
	else
	{
		hours = parseInt(time.split(':')[0]);
		minutes = parseInt(time.split(':')[1]);
		if(hours > 24 || minutes > 59)
			return false;
	}
	return true;
};

/**
 * Validate float value
 */
jQueryFormValidator.validateFloat = function(val) 
{
	return val.match(/^(\-|)([0-9]+)\.([0-9]+)$/) != null;
};

/**
 * Has month only 30 days?
 * @return boolean
 */
jQueryFormValidator.isShortMonth = function(m)
{
	return ( (m%2 == 0 && m < 7) || (m%2 != 0 & m > 7) ) ? true : false;
};

/**
 * Simple spam check
 */
jQueryFormValidator.simpleSpamCheck = function(val, classAttr)
{
	answer = classAttr.match(/captcha([0-9a-z]*)/i)[1].replace('captcha', '');
	return (val == answer) ? true : false;
};


/**
 * Validate domain name
 */
jQueryFormValidator.validateDomain = function(val)
{
	val = val.replace('http://', '').replace('www.', '');
	var arr = new Array(
			'.com','.net','.org','.biz','.coop','.info','.museum','.name',
			'.pro','.edu','.gov','.int','.mil','.ac','.ad','.ae','.af','.ag',
			'.ai','.al','.am','.an','.ao','.aq','.ar','.as','.at','.au','.aw',
			'.az','.ba','.bb','.bd','.be','.bf','.bg','.bh','.bi','.bj','.bm',
			'.bn','.bo','.br','.bs','.bt','.bv','.bw','.by','.bz','.ca','.cc',
			'.cd','.cf','.cg','.ch','.ci','.ck','.cl','.cm','.cn','.co','.cr',
			'.cu','.cv','.cx','.cy','.cz','.de','.dj','.dk','.dm','.do','.dz',
			'.ec','.ee','.eg','.eh','.er','.es','.et','.fi','.fj','.fk','.fm',
			'.fo','.fr','.ga','.gd','.ge','.gf','.gg','.gh','.gi','.gl','.gm',
			'.gn','.gp','.gq','.gr','.gs','.gt','.gu','.gv','.gy','.hk','.hm',
			'.hn','.hr','.ht','.hu','.id','.ie','.il','.im','.in','.io','.iq',
			'.ir','.is','.it','.je','.jm','.jo','.jp','.ke','.kg','.kh','.ki',
			'.km','.kn','.kp','.kr','.kw','.ky','.kz','.la','.lb','.lc','.li',
			'.lk','.lr','.ls','.lt','.lu','.lv','.ly','.ma','.mc','.md','.mg',
			'.mh','.mk','.ml','.mm','.mn','.mo','.mp','.mq','.mr','.ms','.mt',
			'.mu','.mv','.mw','.mx','.my','.mz','.na','.nc','.ne','.nf','.ng',
			'.ni','.nl','.no','.np','.nr','.nu','.nz','.om','.pa','.pe','.pf',
			'.pg','.ph','.pk','.pl','.pm','.pn','.pr','.ps','.pt','.pw','.py',
			'.qa','.re','.ro','.rw','.ru','.sa','.sb','.sc','.sd','.se','.sg',
			'.sh','.si','.sj','.sk','.sl','.sm','.sn','.so','.sr','.st','.sv',
			'.sy','.sz','.tc','.td','.tf','.tg','.th','.tj','.tk','.tm','.tn',
			'.to','.tp','.tr','.tt','.tv','.tw','.tz','.ua','.ug','.uk','.um',
			'.us','.uy','.uz','.va','.vc','.ve','.vg','.vi','.vn','.vu','.ws',
			'.wf','.ye','.yt','.yu','.za','.zm','.zw', '.mobi'
		);
	
	var dot = val.lastIndexOf('.');
	var domain = val.substring(0, dot);
	var ext = val.substring(dot, val.length);
	
	var hasTopDomain = false;
	for(var i=0; i < arr.length; i++) {
		if(arr[i] == ext) {
			hasTopDomain = true;
			break;
		}
	}
	
	if(!hasTopDomain)
		return false;
	else if(dot < 2 || dot > 57)
		return false;
	else
	{
		firstChar = domain.substring(0, 1);
		lastChar = domain.substring(domain.length-1, domain.length);
		if(firstChar == '-' || firstChar == '.' || lastChar == '-' || lastChar == '.')
			return false;
		
		if(domain.split('.').length > 3 || domain.split('..').length > 1)
			return false;
		
		if(domain.replace(/[0-9a-z\.\-]/g, '') != '')
			return false;
	}

	return true;
};

jQueryFormValidator.validateUrl = function(url)
{
	urlFilter = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
	return urlFilter.test(url);
};
