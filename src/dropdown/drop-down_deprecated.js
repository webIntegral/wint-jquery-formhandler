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

$.widget( 'wint.dropdown', {
	
	// Default options
	options: {
		
		/**
		 * jquery object (dom element) that holds validation messages
		 */
		help_block: null,
		
		/**
		 * Template to create help block (when not set)
		 */
		help_block_tpl: '<div></div>',
		
		/**
		 * Value not allowed (Corresponds to "Select option)
		 */
		not_allowed: 0,
		
		/**
		 * Focus in Error/Valid classes and error messages
		 */
		focus_in_error_class: 'wint-frm-error',
		focus_in_valid_class: 'wint-frm-success',
		focus_in_msgs: {
			not_allowed: '<i class="fa fa-bomb"></i> Select an option!',
			valid: '<i class="fa fa-fire"></i> You\'re on fire! Well done!'
		},
		
		/**
		 * Focus out Error/Valid classes and error messages
		 */
		focus_out_error_class: 'wint-frm-error',
		focus_out_valid_class: 'wint-frm-success',
		focus_out_msgs: {
			not_allowed: '<i class="fa fa-umbrella"></i> Don\'t leave us hanging! Select an option',
			valid: '<i class="fa fa-check"></i> You\'re on fire! Well done'
		}
	},
	
	/**
	 * Constructor
	 */
	_create: function() {
		
		// Add custom class
		this.element.addClass( 'wint-frm-text-input' );
		
		// Init help block
		this._initHelpBlock();
		
		// Watch changes and setups validations
		this._watchChanges();
		
		// If input is not empty, validate
		// in case there is something wrong
		if ( this.element.val() != '' ) {
			this.focusOutValidate();
		}
		
	}, //_create
	
	/**
	 * _initHelpBlock
	 * 
	 * Check if help block is defined. If not, creates one
	 * Set appropiated class for custom block
	 * 
	 */
	_initHelpBlock: function() {
		
		var $element = this.element
		var $help_block = this.options.help_block;
		var $help_block_tpl = this.options.help_block_tpl;
		
		// Check if help block is not defined or is not a instance of jquery
		if ( null == $help_block || 
				undefined == $help_block || 
				! ( $help_block instanceof jQuery ) ) {
			
			// Create help block
			this.options.help_block = $( $help_block_tpl );
			$help_block = this.options.help_block;
			$element.after( $help_block );
		}
		
		// Set class
		$help_block.addClass( 'wit-frm-help-block' );
		$help_block.addClass( 'hide' );
	}, //_initHelpBlock
	
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
                    	$this.focusInValidate();
                    }
				});
			})
			.on( 'blur', function( e ) {
				$element.off( 'change' );
				$this.focusOutValidate();
			});
	}, //_watchChanges
	
	/**
	 * focusInValidate
	 * 
	 * Validation method for on focus in
	 * To encourage user to keep typing
	 * 
	 */
	focusInValidate: function() {
		
		var $error_class = this.options.focus_in_error_class;
		var $valid_class = this.options.focus_in_valid_class;
		var $msgs = this.options.focus_in_msgs;
		
		// Call validation
		this.validate({
			error_class: $error_class,
			valid_class: $valid_class,
			msgs: $msgs
			
		});
	}, //focusInValidate
	
	/**
	 * focusOutValidate
	 * 
	 * Validation method on focus out
	 * To encourage user to comeback and continue
	 * 
	 */
	focusOutValidate: function() {
		
		var $error_class = this.options.focus_out_error_class;
		var $valid_class = this.options.focus_out_valid_class;
		var $msgs = this.options.focus_out_msgs;
		
		// Call validation
		this.validate({
			error_class: $error_class,
			valid_class: $valid_class,
			msgs: $msgs
		});
	}, //focusOutValidate
	
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
	validate: function( options ) {
		
		var $error_class = options.error_class;
		var $valid_class = options.valid_class;
		var $msgs 		 = options.msgs;
		
		//  Variables to call setHelpBlock
		var $msg = '';
		var $class = $error_class;
		
		if ( this.validateNotAllowed() ) {
			$msg = $msgs.valid;
			$class = $valid_class;
		} else {
			$msg =$msgs.not_allowed;
		}
		
		// Set Help Block (message)
		this.setHelpBlock({
			msg: $msg,
			type: $class
		});
		
	}, //validate
	
	/**
	 * setHelpBlock
	 * 
	 * Sets message and class for help block
	 * To display proper user feedback
	 * 
	 */
	setHelpBlock: function( options ) {
		
		var $help_block = this.options.help_block;
		
		var $msg = options.msg;
		var $class = options.type;
		
		// Reset help block class
		this._resetHelpBlockClass();
		
		// Is message is not empty
		if ( $msg != '' && $msg != null ) {
			$help_block.html( $msg );
			$help_block.addClass( $class );
			$help_block.removeClass( 'hide' );
		}
	}, //setHelpBlock
	
	/**
	 * _resetHelpBlockClass
	 * 
	 * Resets help block class (style)
	 */
	_resetHelpBlockClass: function() {
		
		var $help_block = this.options.help_block;
		var $error_class = this.options.focus_in_error_class;
		var $valid_class = this.options.focus_in_valid_class;
		
		$help_block.removeClass($error_class);
		$help_block.removeClass($valid_class);
	}, //_resetHelpBlockClass
	
	/*
	 * @todo: Check and finish. Delete useless
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
	
	/**
	 * value
	 * 
	 * Returns text input value, valid or not
	 * 
	 */
	value: function() {
		return this.element.val();
	}

}); //widget