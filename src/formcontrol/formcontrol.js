/*!
 * jQuery Form Control
 *
 * Base widget for form control objects.
 * This widget is intended to be extended by
 * children controls as textinput and dropdown
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

$.widget( 'wint.formcontrol', {
	
	// Default options
	options: {
		
		/**
		 * flag value is valid
		 */
		valid: false,
		
		/**
		 * Control class
		 */
		control_class: 'wint-frm-control',
		
		/**
		 * jquery object (dom element) that holds validation messages
		 */
		help_block: null,
		
		/**
		 * Template to create help block (when not set)
		 */
		help_block_tpl: '<div></div>',
		
		/**
		 * Focus in Error/Valid classes and error messages
		 */
		focus_in_error_class: 'wint-frm-error',
		focus_in_valid_class: 'wint-frm-success',
		focus_in_msgs: {
			error: '<i class="fa fa-bomb"></i> There\'s an error here. Please check!',
			valid: '<i class="fa fa-fire"></i> You\'re on fire! Well done!'
		},
		
		/**
		 * Focus out Error/Valid classes and error messages
		 */
		focus_out_error_class: 'wint-frm-error',
		focus_out_valid_class: 'wint-frm-success',
		focus_out_msgs: {
			error: '<i class="fa fa-bomb"></i> There\'s an error here. Please check!',
			valid: '<i class="fa fa-check"></i> You\'re on fire! Well done'
		}
	},
	
	/**
	 * Constructor
	 */
	_create: function() {
		
		// Add custom class
		this.element.addClass( this.options.control_class );
		
		// Init help block
		this._initHelpBlock();
		
		// Watch changes and setups validations
		this._watchChanges();
		
		// Hook for children init actions
		this._initialize();
	}, //_create
	
	/**
	 * _initialize
	 * 
	 * Hook for children custom init actions
	 * 
	 */
	_initialize: function() {
		
	}, //_init
	
	/**
	 * _watchChanges
	 * 
	 * Hook for children to bind validation actions and events
	 * This method should be overriden by children if required
	 * 
	 */
	_watchChanges: function() {
		
		// Throw custom error if not defined
		throw 'define _watchChanges function.';
		
	}, //_watchChanges
	
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
	 * focusInValidate
	 * 
	 * Validation method for on focus in
	 * To encourage user to keep typing
	 * 
	 */
	_focusInValidate: function() {
		
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
	 * validate
	 * 
	 * validate function.
	 * I called without parameters, it uses focus out validation options
	 * 
	 * @par options: {
	 * 	error_class: Error class (style) for validation
	 *  valid_class: Valid class (style) for validation
	 *  msgs: Messages for min_length, max_length and regexp
	 * }
	 * 
	 * @return boolean
	 * 
	 */
	validate: function( options ) {
		
		var $error_class = this.options.focus_out_error_class;
		var $valid_class = this.options.focus_out_valid_class;
		var $msgs 		 = this.options.focus_out_msgs;
		
		if ( typeof options !== 'undefined' ) {
			$error_class = 	(typeof options.error_class === 'undefined') ? $error_class : options.error_class;
			$valid_class = 	(typeof options.valid_class === 'undefined') ? $valid_class : options.valid_class;
			$msgs 		 = 	(typeof options.msgs 		=== 'undefined') ? $msgs 		: options.msgs;
		}
		
		// Call validation
		var $valid = this._validate({
			error_class	: $error_class,
			valid_class	: $valid_class,
			msgs		: $msgs
		});
		
		// Setup valid flag
		if ( typeof $valid === 'undefined' ) {
			throw ('_validate function must return a boolean value');
			this.options.valid = undefined;
			$valid = false;
		} else {
			this.options.valid = $valid;
		}
		
		return $valid;
	}, //validate
	
	/**
	 * _validation
	 * 
	 * Hook for children to define their own validation actions
	 * setHelpBlock must be used to display user feedback
	 * 
	 * @par object: {
	 * 	error_class: Error class (style) for validation
	 *  valid_class: Valid class (style) for validation
	 *  msgs: Messages for min_length, max_length and regexp
	 * }
	 * 
	 * @return boolean
	 * 
	 */
	_validate: function( options ) {
		
		// Throw custom error if not defined
		throw 'define _validate function.';
	}, //_validate
	
	/**
	 * setHelpBlock
	 * 
	 * Sets message and class for help block
	 * To display proper user feedback
	 * 
	 * @par options: {
	 *  msg: Error message
	 *  type: class for error message
	 * }
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
	
	/**
	 * value
	 * 
	 * Returns text input value, valid or not
	 * 
	 */
	value: function() {
		return this._value();
	}, //value
	
	/**
	 * _value
	 * 
	 * Hook for children to define custom value getter if required
	 * This method can be overriden by children if required
	 * 
	 */
	_value: function() {
		return this.element.val();
	}, //_value
	
	/**
	 * isValid
	 * 
	 * Get if the widget string is valid or not
	 */
	isValid: function() {
		return this.options.valid;
	}

}); //widget