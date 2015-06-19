# xrm or xrm:app  

> The xrm generator build an entire xrm platform based on an object definition.

	{
    	label: 'Object',
	    plural: 'Objects',
    	description: 'Description',
	    fields: [{
      		label: 'Object Name',
      		name: 'Name',
	      	string: { length: 80 }
    	}]
		layout: {
		}
	}

see definition: [xrm](app/USAGE.md "xrm")


# xrm:client-angular

> The client-angular xrm generator build the client app in angular based on an object definition.

see definition: [xrm-client-angular](client-angular/USAGE.md "xrm-client-angular")


# xrm:database

> The database xrm generator builds the database schema in sql based on an object definition.

see definition: [xrm-database](database/USAGE.md "xrm-database")


# xrm:server-aspnet

> The aspnet xrm generator builds the server/backend app in aspnet based on an object definition.

see definition: [xrm-server-aspnet](server-aspnet/USAGE.md "xrm-server-aspnet")


# entity definition

	{
    	label: 'object', 				-- label for entity
	    plural: 'objects',				-- plural label for entity
    	description: 'description',		-- brief description of entity
	    fields: [						-- an array of field definitions (see below)
			--field definition--
		]
	}


# field definition

	{
    	label: 'field',  				-- label for field
	    name: 'field',					-- name for field
		description: 'description',		-- brief description of field
		helpText: 'help text',			-- help text used for field
	    --field type--: { }				-- the type of field (see below)
	}

## field types

### autoNumber

	autoNumber: {
		displayFormat: 'A-{0000}'		-- display format used for field
		startingNumber: 0,				-- starting number
		externalId: true|false,			-- set this field as the unique record identifier from an external system
		option-generate: true|false		-- generate auto number for existing records
	}

### formula

	formula: {
		returnType: 'checkbox|currency|date|dateTime|number|percent|text'	-- field type that is returned
		formula: 'body of formula'			-- the formula used
		option-blanks: 'zeroes|blanks'	-- if your formula references any number, currency, or percent fields,
											   specify what happens to the formula output when their values are blank.  
	}

### rollupSummary

	rollupSummary: {
	}

### lookup

	lookup: {
		relatedTo: 'entity',			-- entity related to for lookup
		childName: 'name',				-- child relationship name for lookup
		required: true|false,			-- always require a value in this field in order to save a record
		ondelete: 'clearvalue|dontallow',		-- what to do if the lookup record is deleted
		filter: {						-- optionally, create a filter to limit the records available to users in the lookup field.
			--filter definition--
		}
	}

### masterDetail

	masterDetail: {
		relatedTo: 'entity',			-- entity related to for master-detail
		childName: 'name',				-- child relationship name for master-detail
		required: true|false,			-- always require a value in this field in order to save a record
		onshare: 'read|readwrite',	-- select the minimum access level required on the Master record to
										   create, edit or delete related Detail records.
		filter: {						-- optionally, create a filter to limit the records available to users in the lookup field.
			--filter definition--
		}
	}

### externalLookup

	externalLookup: {
		relatedTo: 'entity',			-- entity related to for external-lookup
	}

### checkbox

	checkbox: {
		defaultValue: true|false		-- default value used for field, checked or unchecked
	}

### currency

	currency: {
		length: 18,						-- number of digits to the left of the decimal point
		scale: 0,						-- number of digits to the right of the decimal point
		required: true|false,			-- always require a value in this field in order to save a record
		defaultValue: 'formula'			-- default value used for field
	}

### date

	date: {
		required: true|false,			-- always require a value in this field in order to save a record
		defaultValue: 'formula'			-- default value used for field
	}

### dateTime

	dateTime: {
		required: true|false,			-- always require a value in this field in order to save a record
		defaultValue: 'formula'			-- default value used for field
	}

### email

	email: {
		required: true|false,			-- always require a value in this field in order to save a record
		unique: true|false,				-- do not allow duplicate values
		externalId: true|false,			-- set this field as the unique record identifier from an external system
		defaultValue: 'formula'			-- default value used for field
	}

### geolocation

	geolocation: {
		displayFormat: 'degrees|decimal'	-- latitude and logitude display notation
		scale: 0,						-- number of digits to the right of the decimal point
		required: true|false,			-- always require a value in this field in order to save a record
	}

### number

	number: {
		length: 18,						-- number of digits to the left of the decimal point
		scale: 0,						-- number of digits to the right of the decimal point
		required: true|false,			-- always require a value in this field in order to save a record
		unique: true|false,				-- do not allow duplicate values
		defaultValue: 'formula'			-- default value used for field
	}

### percent

	percent: {
		length: 18,						-- number of digits to the left of the decimal point
		scale: 0,						-- number of digits to the right of the decimal point
		required: true|false,			-- always require a value in this field in order to save a record
		defaultValue: 'formula'			-- default value used for field
	}


### phone

	phone: {
		required: true|false,			-- always require a value in this field in order to save a record
		defaultValue: 'formula'			-- default value used for field
	}

### picklist

	picklist: {
		values: [...],					-- enter values for the picklist
		sort: true|false,				-- sort values alphabetically, not in the order netered. values
										   will be displayed alphabetically everywhere. 
		defaultFirst: true|false		-- use first value as default value
	}

### picklistMulti

	picklistMulti: {
		values: [...],					-- enter values for the picklist
		sort: true|false,				-- sort values alphabetically, not in the order netered. values
										   will be displayed alphabetically everywhere. 
		defaultFirst: true|false,		-- use first value as default value
		visibleLines: 4					-- multi-select picklists are displayed in a scrolling box on edit pages.
	}


### text

	text: {
		length: 255,					-- please enter the maximum length for a text field below
		required: true|false,			-- always require a value in this field in order to save a record
		unique: true|false,				-- do not allow duplicate values
		externalId: true|false,			-- set this field as the unique record identifier from an external system
		defaultValue: 'formula'			-- default value used for field
		option-casesensitive: true|false	-- treat 'ABC' and 'abc' as different(true) or duplicate(false) values 
	}

### textArea

	textArea: {
		required: true|false,			-- always require a value in this field in order to save a record
		defaultValue: 'formula'			-- default value used for field
	}

### textAreaLong

	textAreaLong: {
		length: 32768,					-- please enter the maximum length for a text field below (max 131,072)
		visibleLines: 4,				-- text areas are displayed in a mulit-line box on edit pages.
		defaultValue: 'formula'			-- default value used for field
	}

### textAreaRich

	textAreaRich: {
		length: 32768,					-- please enter the maximum length for a text field below (max 131,072)
		visibleLines: 25				-- text areas are displayed in a mulit-line box on edit pages.
	}

### textEncrypted

	textEncrypted: {
		length: 255,					-- please enter the maximum length for a text field below
		required: true|false,			-- always require a value in this field in order to save a record
		maskType: 'maskall|lastfour|creditcard|nationalinsurance|socialsecurity|socialinsurance',	-- format used to mask value
		maskCharacter: '*|X',			-- always require a value in this field in order to save a record
	}

### url

	url: {
		required: true|false,			-- always require a value in this field in order to save a record
		defaultValue: 'formula'			-- default value used for field
	}


## filter definition

	filter: {
	}


# layout definition

	layout: {
	}