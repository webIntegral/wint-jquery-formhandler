/*!
 * jQuery Text Input Validation
 *
 * Text imput with two stages of validation:
 * On focus in, where one can encourage user to continuer
 * On focus out, where one can encourage user to go back
 * One can set up min_length, max_length and a regexp to validate,
 * and custom messages for each error type and success.
 *
 * @package   Web_Integral_Turistica
 * @author    Mario Orozco - Web Integral <mario@webintegral.com.co>
 * @license   GPL-2.0+
 * @link      http://webintegral.com.co
 * @copyright Copyright (c) 2014, Web Integral
 * @version   0.0.1
 */

/*
 * @todo: Make it AMD 
 */

$.widget( 'wint.textinput', $.wint.formcontrol, {
	
	// Default options
	options: {
		
		/**
		 * Regular expression to validate text input content
		 */
		regexp: null,
		
		/**
		 * Minimum string length
		 */
		min_length: 0,
		
		/**
		 * Maximum string length
		 */
		max_lenght: null,
		
		/**
		 * Focus in Error/Valid classes and error messages
		 */
		focus_in_msgs: {
			error: '<i class="fa fa-bomb"></i> There\'s an error here. Please check!',
			regexp: '<i class="fa fa-bomb"></i> Ups! It seems you\'re putting some weird characters here!',
			min_length: '<i class="fa fa-trophy"></i> You\'re almost there! Type a little bit more',
			max_length: '<i class="fa fa-hand-scissors-o"></i> Wow! That\'s kind of too much. Shorten that a little!',
			valid: '<i class="fa fa-fire"></i> You\'re on fire! Well done!'
		},
		
		/**
		 * Focus out Error/Valid classes and error messages
		 */
		focus_out_msgs: {
			error: '<i class="fa fa-bomb"></i> There\'s an error here. Please check!',
			regexp: '<i class="fa fa-umbrella"></i> Don\'t leave us hanging! There are some weird characters here!',
			min_length: '<i class="fa fa-hand-lizard-o"></i> Say something, man! Type a little bit more',
			max_length: '<i class="fa fa-hand-rock-o"></i> That\'s a lot! Try using a little of delete key',
			valid: '<i class="fa fa-check"></i> You\'re on fire! Well done'
		}
	},
	
	/**
	 * _initialize
	 */
	_initialize: function() {
		// If input is not empty, validate
		// in case there is something wrong
		if ( this.element.val() != '' ) {
			this.validate();
		}
	},
	
	/**
	 * _watchChanges
	 * 
	 * Watch changes on focusIn and triggers validation on
	 * change and on blur
	 * 
	 */
	_watchChanges: function() {
		
		var $this = this;
		var $element = this.element;
		
		// Bind events
		$element
			.on( 'focusin', function( e ) {
				$element
				.on( 'propertychange keyup input paste', function() {
                    if ( $element.data( 'oldVal' ) != $element.val() ) {
                    	$this._focusInValidate();
                    }
				});
			})
			.on( 'blur', function( e ) {
				$element.off( 'propertychange keyup input paste' );
				$this.validate();
			});
	}, //_watchChanges
	
	/**
	 * validate
	 * 
	 * Runs validation for regexp, min_length and max_length
	 * seting help_bloc (user feedback) with error_class, valid_class
	 * and msgs (messages) defined in options parameter.
	 * 
	 * @par options: {
	 * 	error_class: Error class (style) for validation
	 *  valid_class: Valid class (style) for validation
	 *  msgs: Messages for min_length, max_length and regexp
	 * }
	 * 
	 */
	_validate: function( options ) {
		
		var $error_class = options.error_class;
		var $valid_class = options.valid_class;
		var $msgs 		 = options.msgs;
		var $valid		 = false;
		
		//  Variables to call setHelpBlock
		var $msg = '';
		var $class = $error_class;
		
		if ( this.validateRegexp() ) {
			if ( this.validateMinLength() ) {
				if ( this.validateMaxLength() ) {
					$msg = $msgs.valid;
					$class = $valid_class;
					$valid = true;
				} else {
					$msg = $msgs.max_length;
				}
				
			} else {
				$msg = $msgs.min_length;
			}
			
		} else {
			$msg = $msgs.regexp;
		}
		
		// Set Help Block (message)
		this.setHelpBlock({
			msg: $msg,
			type: $class
		});
		
		return $valid;
	}, //_validate
	
	/**
	 * validateRegex
	 * 
	 * Validate text input against this.options.regexp
	 * 
	 * @return boolean
	 * 
	 */
	validateRegexp: function() {

		var $regexp = this.options.regexp;
		
		// Init valid flag
		var $valid = true;
		
		// Check if not valid
		if ( $regexp != '' && $regexp != null ) {
			if ( ! $regexp.test( this.element.val() ) ) {
				$valid = false;
			}
		}
		
		return $valid;
	}, //validateRegexp
	
	/**
	 * validateMinLength
	 * 
	 * Validate text input minimum length
	 * 
	 * @return boolean
	 * 
	 */
	validateMinLength: function() {
		
		var $element = this.element;
		var $min_length = this.options.min_length;
		
		// Init valid flag
		var $valid = true;
		
		// Check if not valid
		if ( $min_length != null && $min_length > 0 ) {
			if ( $element.val().length < $min_length ) {
				$valid = false;
			}
		}
		
		return $valid;
	}, //validateMinLength
	
	/**
	 * validateMaxLength
	 * 
	 * Validate text input maximum length
	 * 
	 * @return boolean
	 * 
	 */
	validateMaxLength: function() {
		
		var $element = this.element;
		var $max_length = this.options.max_length;
		
		// Init valida flag
		var $valid = true;
		
		// Check if not valid
		if ( $max_length != null ) {
			if ( $element.val().length > $max_length ) {
				$valid = false;
			}
		}
		
		return $valid;
	}, //validateMaxLength

}); //widget