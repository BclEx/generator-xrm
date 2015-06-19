# generator-xrm

> A [Yeoman](http://yeoman.io) generator for Xrm.

## Getting Started

- Install Yeoman `npm install -g yo` (one-time global install).
- Install this generator with `npm install -g generator-xrm` (one-time global install).
- From the terminal, navigate to your site's directory (hint: creating a separate UI directory in the project root works pretty well).
- Type `yo xrm name`, where name is a local name.json file, and wait.

		body of name.json
		{
	        label: 'Object',
	        plural: 'Objects',
	        description: 'Description',
	        fields: [{
	          label: 'Object Name',
	          name: 'Name',
	          text: { length: 80 }
	        }]
		}

- Alternatively type `yo xrm:[client-angular|database|server-aspnet] name`, where name is a local name.json file, and wait.

see usage: [usage](USAGE.md "usage")


## Development Plans
- The generator works but is pretty basic at this point.

## Changelog
- 0.1.0
  - First commit. Functional but needs work.