/* global wp */
/* jshint esversion: 5, es3:false */
const el = wp.element.createElement,
	registerBlockType = wp.blocks.registerBlockType,
	ServerSideRender = wp.components.ServerSideRender,
	TextControl = wp.components.TextControl,
	InspectorControls = wp.editor.InspectorControls;

const fields = [
	{ id: 'title', label: 'Title' },
	{ id: 'email_placeholder', label: 'Placeholder' },
	{ id: 'submit_label', label: 'Submit button label' },
	{ id: 'consent_text', label: 'Consent text' },
	{ id: 'processing_label', label: '"Processing" status message' },
	{ id: 'success_label', label: 'Success status message' },
	{ id: 'error_label', label: 'Error status message' },
];

registerBlockType( 'jetpack/email-subscribe', {
	title: 'Email Subscribe Block',
	icon: 'email',
	category: 'widgets',

	edit: function( props ) {
		const edit_controls = fields.map( function( field ) {
			return el( InspectorControls, {},
				el( TextControl, {
					label: field.label,
					value: props.attributes[ field.id ],
					onChange: function( value ) {
						const newVal = {};
						newVal[ field.id ] = value;
						props.setAttributes( newVal );
					},
				} )
			);
		} );

		return [
			el( ServerSideRender, {
				block: 'jetpack/email-subscribe',
				attributes: props.attributes,
			} ),
		].concat( edit_controls );
	},

	// We're going to be rendering in PHP, so save() can just return null.
	save: function() {
		return null;
	},
} );
