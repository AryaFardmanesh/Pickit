/**
 * @file index.js
 * @author Arya Fardmanesh
 * @description This file contains the main logic of the program.
**/


/**
 * @public
 * @readonly
 * @name addresses
 * @description This object is responsible for maintaining the addresses used in the program.
**/
const addresses = Object.freeze( {
	copyIcon: './../img/icons/copy.png',
	checkeIcon: './../img/icons/checked.png',
} );


/**
 * @public
 * @class
 * @name QuoteResult
 * @description This class is for creating an object of the quote result to display to the user.
**/
class QuoteResult {
	/**
	 * @constructor
	 * @param { String } author
	 * @param { String } profileImageAddress
	 * @param { String } quote
	 * @param { [String] } tags
	 */
	constructor( author, profileImageAddress, quote, tags ) {
		this.author = author;

		this.profileImageAddress = profileImageAddress;

		this.quote = quote;

		this.tags = tags;
	}
}


/**
 * @public
 * @class
 * @name App
 * @description This class is for maintaining the methods and properties of the program.
**/
class App {

	/**
	 * @public
	 * @name messageBox
	 * @param { String } message
	 * @param { 'info' | 'success' | 'warning' | 'error' } flag
	 * @param { Boolean } autoClose
	 * @returns { undefined }
	 * @description This function displays a message to the user.
	*/
	static messageBox( message, flag, autoClose = true ) {
		// Checking data types
		if ( typeof message !== 'string' ) {
			if ( message["toString"] !== undefined ) {
				this.messageBox(
					`@Internal error: @Type Error: ` +
					`The input message to the messageBox function is not of string type and cannot be converted to a string.<br />` +
					`App.messageBox( /* Error -> */message: ${ message }/* <- Error */, flag: ${ flag }, autoClose: ${ autoClose } );`,
					'error',
					false
				);
				return;
			}
			message = message.toString();
		}

		if ( ![ 'info', 'success', 'warning', 'error' ].includes( flag ) ) {
			this.messageBox(
				`[ Type Error | Data Error ]: ` +
				`The input value to this function is incorrect. This function only accepts ['info' | 'success' | 'warning' | 'error'] values as flag.<br />` +
				`App.messageBox( /* Error -> */message: ${ message }/* <- Error */, flag: ${ flag }, autoClose: ${ autoClose } );`,
				'error',
				false
			);
			return;
		}

		if ( typeof autoClose !== 'boolean' ) {
			autoClose = ( autoClose ) ? true : false;
		}

		// Setting background color from flag.
		const bgColor =
			( flag === 'info' 	) 	? '#007bff' :
			( flag === 'success' 	) 	? '#28a745' :
			( flag === 'warning' 	) 	? '#ffc107' :
			( flag === 'error' 	) 	? '#dc3545' :
						  	  '#17a2b8'
		;

		// Create HTML
		const container = document.createElement( 'div' );
		container.style.position = 'fixed';
		container.style.transform = 'translate(-50%, -50%)';
		container.style.top = '35px';
		container.style.left = '50%';
		container.style.boxSizing = 'border-box';
		container.style.width = '90%';
		container.style.padding = '10px 15px';
		container.style.backgroundColor = `${ bgColor }bb`;
		container.style.borderRadius = '6px';
		container.style.display = 'flex';
		container.style.alignItems = 'center';
		container.style.justifyContent = 'space-between';
		container.style.transition = '0.2s';

		const messageElement = document.createElement( 'p' );
		messageElement.innerHTML = message;
		messageElement.style.textWrap = 'wrap';
		container.appendChild( messageElement );

		const closeButton = document.createElement( 'button' );
		closeButton.innerHTML = '&times;';
		closeButton.style.padding = '2px 5px';
		closeButton.style.backgroundColor = 'var(--color-seasalt)';
		closeButton.style.border = 'none';
		closeButton.style.borderRadius = '4px';
		closeButton.style.fontSize = '1rem';
		container.appendChild( closeButton );

		// Add close event
		closeButton.addEventListener( 'click', () => {
			container.remove();
		} );

		// Setting automatic close animation.
		if ( autoClose ) {
			setTimeout( () => {
				let opacity = 100;
				const fadeLoop = setInterval( () => {
					opacity -= 8;
					container.style.opacity = `${ opacity }%`;

					if ( opacity <= 0 ) {
						container.remove();
						clearInterval( fadeLoop );
					}
				}, 100 /* Loop Speed */ );
			}, 2000 /* First Delay */ );
		}

		// Showing message box.
		document.body.appendChild( container );
	}


	/**
	 * @public
	 * @async
	 * @name writeToClipboard
	 * @param { String } message
	 * @returns { undefined }
	 * @description This function writes text to the user's clipboard.
	**/
	static writeToClipboard = async function ( message ) {
		if ( typeof message !== 'string' ) {
			this.messageBox(
				`@Type Error: ` +
				`The input message to the writeToClipboard function is not of string type.<br />` +
				`App.writeToClipboard( /* Error -> */message: ${ message }/* <- Error */ );`,
				'error',
				false
			);
			return;
		}

		try {
			await navigator.clipboard.writeText( message );
		} catch ( error ) {
			this.messageBox(
				`@Internal Error: @Fatal Error: ` +
				`Writing to clipboard failed.<br />` +
				`@Catched Error: ${ error.message }<br />` +
				`App.writeToClipboard( message: ${ message } );`,
				'error',
				false
			);
			return;
		}
	}


	/**
	 * @public
	 * @name createResultBox
	 * @param { QuoteResult } quoteResult 
	 * @returns { HTMLDivElement }
	 * @description This function is for creating a result box for quotes.
	**/
	static createResultBox = function ( quoteResult ) {
		const container = document.createElement( 'div' );
		container.className = 'container-result';

		const containerProfile = document.createElement( 'div' );
		containerProfile.className = 'container-profile';
		container.appendChild( containerProfile );

		const profileImage = document.createElement( 'img' );
		profileImage.src = `./../${ quoteResult.profileImageAddress }`;
		profileImage.alt = `${ quoteResult.author } profile picture.`;
		profileImage.className = 'profile-image';
		containerProfile.appendChild( profileImage );

		const authorName = document.createElement( 'span' );
		authorName.innerText = quoteResult.author;
		authorName.className = 'profile-name';
		containerProfile.appendChild( authorName );

		const btnCopy = document.createElement( 'button' );
		btnCopy.className = 'btn-copy';
		btnCopy.className = 'btn-copy';
		btnCopy.title = 'Copy quote text.';
		btnCopy.onclick = () => {
			try {

				App.writeToClipboard( quoteResult.quote.trim() );

				iconCopy.src = addresses.checkeIcon;
				setTimeout( () => {
					iconCopy.src = addresses.copyIcon;
				}, 2000 );
			}catch ( error ) {
				App.messageBox( `Cannot copy quote.<br />Error: ${ error }`, 'error' );
			}
		}
		container.appendChild( btnCopy );

		const iconCopy = document.createElement( 'img' );
		iconCopy.src = addresses.copyIcon;
		iconCopy.alt = 'Copy icon.';
		iconCopy.className = 'copy-icon';
		btnCopy.appendChild( iconCopy );

		const quoteContainer = document.createElement( 'div' );
		quoteContainer.className = 'container-quote';
		container.appendChild( quoteContainer );

		const quoteText = document.createElement( 'p' );
		quoteText.className = 'quote-text';
		quoteText.innerText = quoteResult.quote;
		quoteContainer.appendChild( quoteText );

		const containerTags = document.createElement( 'div' );
		containerTags.className = 'container-tags';
		container.appendChild( containerTags );

		for ( const tag of quoteResult.tags ) {
			if ( typeof tag !== 'string' ) {
				App.messageBox(
					`@Internal Error: @Fatal Error: ` +
					`While creating the result and creating createResultBox, I encountered a tag of non-string type.` +
					`@Current Typeof Tag: '${ typeof tag }'` +
					`@Current Tag: '${ tag }'` +
					`App.createResultBox( '${ quoteResult }' );` +
					`quoteResult.author: '${ quoteResult.author }'` +
					`quoteResult.profileImageAddress: '${ quoteResult.profileImageAddress }'` +
					`quoteResult.quote: '${ quoteResult.quote }'` +
					`quoteResult.tags: '${ quoteResult.tags }'`,
					'error',
					false
				);
				continue;
			}

			const tagElement = document.createElement( 'div' );
			tagElement.className = 'tag';
			tagElement.innerText = `#${ tag }`;
			containerTags.appendChild( tagElement );
		}

		return container;
	}


	/**
	 * @static
	 * @private
	 * @function
	 * @name generateRandomInt
	 * @param { Number } min
	 * @param { Number } max
	 * @returns { Number }
	 * @description It generates a random number between min and max and returns it.
	 */
	static generateRandomInt( min, max ) {
		return Math.floor(
			Math.random() * ( max - min ) + min
		);
	}


	/**
	 * @static
	 * @function
	 * @name generateRandomQuote
	 * @param { String | null } includeKeywords
	 * @param { String | null } authorFilter
	 * @param { String | null } tagFilter
	 * @returns { String | QuoteResult }
	 */
	static generateRandomQuote( includeKeywords = null, authorFilter = null, tagFilter = null ) {
		const stage = [];

		if ( typeof includeKeywords === 'string' ) {
			const keyFilter = includeKeywords.split( ',' );

			for ( let key of keyFilter ) {
				key = key.trim();

				for ( const quote of databases.quotes ) {
					if ( quote.quote.includes( key ) ) {
						stage.push( quote );
					}
				}
			}
		}

		if ( typeof authorFilter === 'string' ) {
			for ( const quote of databases.quotes ) {
				if ( quote.author.name.toLowerCase() === authorFilter.toLowerCase() ) {
					stage.push( quote );
				}
			}
		}

		if ( typeof tagFilter === 'string' ) {
			for ( const quote of databases.quotes ) {
				for ( const tag of quote.tags ) {
					if ( tag.toLowerCase() === tagFilter.toLowerCase() ) {
						stage.push( quote );
					}
				}
			}
		}

		// No any filters
		if ( includeKeywords === null && authorFilter === null && tagFilter === null ) {
			for ( const quote of databases.quotes ) {
				stage.push( quote );
			}
		}

		if ( stage.length === 0 ) {
			return null;
		}
	
		const randInt = this.generateRandomInt( 0, ( stage.length - 1 ) );
		const result = stage[ randInt ];
		return new QuoteResult(
			result.author.name,
			result.author.picture,
			result.quote,
			result.tags
		);
	}


	/**
	 * @static
	 * @function
	 * @name createAuthorItemsFilter
	 * @param { String } authorName
	 * @returns { undefined }
	 * @description This function adds an item to the filter list of authors
	**/
	static createAuthorItemsFilter( authorName ) {
		const span = document.createElement( 'span' );
		span.className = 'filter-item';
		span.innerHTML = authorName;
		document.querySelector( '#btn-author-filter .container-filter-items' ).appendChild( span );
	}


	/**
	 * @static
	 * @function
	 * @name createTagItemsFilter
	 * @param { String } tagName
	 * @returns { undefined }
	 * @description This function adds an item to the filter list of tags
	**/
	static createTagItemsFilter( tagName ) {
		const span = document.createElement( 'span' );
		span.className = 'filter-item';
		span.innerHTML = tagName;
		document.querySelector( '#btn-tag-filter .container-filter-items' ).appendChild( span );
	}
}


// ======================== Define Events ========================
window.addEventListener( 'DOMContentLoaded', () => {
	const quote = App.generateRandomQuote( null, null, null );

	if ( quote === null ) {
		App.messageBox( 'Error: Something wrongs.<br />Request for generate random quote failed!', 'error' );
		return;
	}

	document.querySelector( '.container .container-card .container-bottom' ).appendChild(
		App.createResultBox( quote )
	);
} );

document.getElementById( 'btn-generate' ).addEventListener( 'click', () => {
	let keywordsFilterOption = document.getElementById( 'specify-keyword-input' );
	keywordsFilterOption = keywordsFilterOption.value;
	keywordsFilterOption = keywordsFilterOption.trim();
	keywordsFilterOption = ( keywordsFilterOption === '' ) ? null : keywordsFilterOption;

	let authorFilterOption = document.getElementById( 'filter-author-display-selected' );
	authorFilterOption = authorFilterOption.getAttribute( 'author-name' );
	authorFilterOption = authorFilterOption.toLowerCase();
	authorFilterOption = ( authorFilterOption === 'all' ) ? null : authorFilterOption;

	let tagFilterOption = document.getElementById( 'filter-tag-display-selected' );
	tagFilterOption = tagFilterOption.getAttribute( 'tag-name' );
	tagFilterOption = tagFilterOption.toLowerCase();
	tagFilterOption = ( tagFilterOption === 'all' ) ? null : tagFilterOption;

	const quote = App.generateRandomQuote( keywordsFilterOption, authorFilterOption, tagFilterOption );

	if ( quote === null ) {
		App.messageBox( 'Error: Something wrongs.<br />Request for generate random quote failed!', 'error' );
		return;
	}

	const containerResult = document.querySelector( '.container .container-card .container-bottom .container-result' );
	if ( containerResult !== null ) {
		containerResult.remove();
	}

	document.querySelector( '.container .container-card .container-bottom' ).appendChild(
		App.createResultBox( quote )
	);
} );

document.getElementById( 'btn-author-filter' ).addEventListener( 'click', () => {
	const menuItems = document.getElementById( 'menu-items-filter-author' );
	menuItems.classList.remove( 'display-none' );

	// For handling close
	document.addEventListener( 'click', () => {
		menuItems.classList.add( 'display-none' );
	}, { once: true, capture: true } );

	const items = document.querySelectorAll( '#menu-items-filter-author .filter-item' );
	items.forEach( elm => {
		elm.addEventListener( 'click', () => {
			const shortedSize = 8;
			let authorName = elm.innerHTML;
			if ( authorName.length >= shortedSize ) {
				authorName = authorName.slice( 0, shortedSize );
				authorName += '...';
			}
			document.getElementById( 'filter-author-display-selected' ).innerHTML = authorName;
			document.getElementById( 'filter-author-display-selected' ).setAttribute( 'author-name', elm.innerHTML );
		}, { once: true } );
	} );
} );

document.getElementById( 'search-author' ).addEventListener( 'keyup', () => {
	const value = document.getElementById( 'search-author' ).value.trim().toLowerCase();
	const finds = [];

	if ( value === '' ) {
		for ( const item of databases.authors ) {
			finds.push( item );
		}
	}else {
		for ( const item of databases.authors ) {
			const itemVal = item.name.toLowerCase();
	
			if ( value === itemVal ) {
				finds.push( item );
			}else if ( itemVal.startsWith( value ) ) {
				finds.push( item );
			}else if ( itemVal.endsWith( value ) ) {
				finds.push( item );
			}
		}
	}

	const itemsAuthor = document.querySelectorAll( '#menu-items-filter-author .filter-item' );
	itemsAuthor.forEach( elm => elm.remove() );
	App.createAuthorItemsFilter( 'All' );
	finds.forEach( elm => App.createAuthorItemsFilter( elm.name ) );
} );

document.getElementById( 'btn-tag-filter' ).addEventListener( 'click', () => {
	const menuItems = document.querySelector( '#btn-tag-filter .container-filter-items' );
	menuItems.classList.remove( 'display-none' );

	// For handling close
	document.addEventListener( 'click', () => {
		menuItems.classList.add( 'display-none' );
	}, { once: true, capture: true } );

	const items = document.querySelectorAll( '#btn-tag-filter .container-filter-items .filter-item' );
	items.forEach( elm => {
		elm.addEventListener( 'click', () => {
			const shortedSize = 8;
			let tagName = elm.innerHTML;
			if ( tagName.length >= shortedSize ) {
				tagName = tagName.slice( 0, shortedSize );
				tagName += '...';
			}
			document.getElementById( 'filter-tag-display-selected' ).innerHTML = tagName;
			document.getElementById( 'filter-tag-display-selected' ).setAttribute( 'tag-name', elm.innerHTML );
		}, { once: true } );
	} );
} );

document.getElementById( 'search-context' ).addEventListener( 'keyup', () => {
	const value = document.getElementById( 'search-context' ).value.trim().toLowerCase();
	const finds = [];

	if ( value === '' ) {
		for ( const item of databases.tags ) {
			finds.push( item );
		}
	}else {
		for ( const item of databases.tags ) {
			const itemVal = item.toLowerCase();
	
			if ( value === itemVal ) {
				finds.push( item );
			}else if ( itemVal.startsWith( value ) ) {
				finds.push( item );
			}else if ( itemVal.endsWith( value ) ) {
				finds.push( item );
			}
		}
	}

	const itemsTags = document.querySelectorAll( '#btn-tag-filter .container-filter-items .filter-item' );
	itemsTags.forEach( elm => elm.remove() );
	App.createTagItemsFilter( 'All' );
	finds.forEach( tagVal => App.createTagItemsFilter( tagVal ) );
} );
// ======================== Define Events ========================
