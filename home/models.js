/**
 * @file models.js
 * @author Arya Fardmanesh
 * @description This file is for defining the data storage structure.
**/


/**
 * @class
 * @public
 * @name Quote
 * @description This is a class for create a object quotes.
**/
class Quote {
	/**
	 * @constructor
	 * @param { String } quote
	 * @param { [String] } tags
	 * @param { Author } author
	**/
	constructor( quote, tags, author ) {
		this.quote = quote;
		this.tags = tags;
		this.author = author;

		databases.quotes.push( this );
	}
}


/**
 * @class
 * @public
 * @name Author
 * @description This is a class for create a object author.
**/
class Author {
	/**
	 * @constructor
	 * @param { String } name
	 * @param { String } picture
	 * @param { [{ quote: String, tags: [String] }] } quotes
	 */
	constructor( name, picture, quotes ) {
		this.name = name;
		this.picture = picture;
		this.quotes = [];

		for ( const quote of quotes ) {
			// Create tags filter from model
			for ( const tag of quote.tags ) {
				if ( !databases.tags.includes( tag ) ) {
					databases.tags.push( tag );
					App.createTagItemsFilter( tag );
				}
			}

			// Create author filter from model
			if ( !databases.authorsName.includes( name ) ) {
				databases.authorsName.push( name );
				App.createAuthorItemsFilter( name );
			}

			this.quotes.push(
				new Quote(
					quote.quote,
					quote.tags,
					this
				)
			);
		}

		databases.authors.push( this );
	}
}
