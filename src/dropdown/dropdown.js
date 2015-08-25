/*!
 * jQuery Drop Down Validation
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

$.widget( 'wint.dropdown', $.wint.formcontrol, {
	
	// Default options
	options: {
		
		/**
		 * Value not allowed (Corresponds to "Select option)
		 */
		not_allowed: 0,
		
		/**
		 * Focus in Error/Valid classes and error messages
		 */
		focus_in_msgs: {
			error: '<i class="fa fa-bomb"></i> There\'s an error here. Please check!',
			not_allowed: '<i class="fa fa-bomb"></i> Select an option!',
			valid: '<i class="fa fa-fire"></i> You\'re on fire! Well done!'
		},
		
		/**
		 * Focus out Error/Valid classes and error messages
		 */
		focus_out_msgs: {
			error: '<i class="fa fa-bomb"></i> There\'s an error here. Please check!',
			not_allowed: '<i class="fa fa-umbrella"></i> Don\'t leave us hanging! Select an option',
			valid: '<i class="fa fa-check"></i> You\'re on fire! Well done'
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
				.on( 'change', function() {
                    if ( $element.data( 'oldVal' ) != $element.val() ) {
                    	$this._focusInValidate();
                    }
				});
			})
			.on( 'blur', function( e ) {
				$element.off( 'change' );
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
		
		if ( this.validateNotAllowed() ) {
			$msg = $msgs.valid;
			$class = $valid_class;
			$valid = true;
		} else {
			$msg =$msgs.not_allowed;
		}
		
		// Set Help Block (message)
		this.setHelpBlock({
			msg: $msg,
			type: $class
		});
		
		return $valid;
	}, //validate
	
	/**
	 * validateNotAllowed
	 * 
	 * Validate if control value is different 
	 * from not_allowed value
	 * 
	 */
	validateNotAllowed: function() {
		
		var $not_allowed = this.options.not_allowed;
		
		// Init valid flag
		var $valid = true;
		
		// Check if not valid
		if ( $not_allowed != null ) {
			if ( $not_allowed == this.element.val() ) {
				$valid = false;
			}
		}
		
		return $valid;
	}, //validateNotAllowed

}); //widget