# Pickit Project
A very small web project, using HTML, CSS and JavaScript. This project is just for funs.
A web page where you can see a quote from famous and influential people in the world by pressing a button. In this simple web page you can filter the randomly generated quotes and see only the quotes you like.
In this project, no library or framework is used and it is implemented only with Vanilla HTML, CSS, and JavaScript.

# Adding new data to database
This is a simple Front-End project. Therefore, no type of database is used in this project, and all data (such as quotes and authors' names, images, etc.) is located in a JavaScript file with the address "root://database/data.js" in a data structure.
For any changes or additions to data (such as adding an author's name or a new citation) you must edit this file.
The data structure in this file is as follows:

```js
new Author(
	"The Author Full Name",
	"/img/profile/Author profile iamge address here.*",
	[
		{
			quote: `The qoute text here`,
			tags: [
				"a tag for searching and filtering here",
			]
		},
	]
);
```

For a more manageable and orderly structure, you should first create an object of the "Author" class (you don't need to keep the object itself in a variable).
This class has three parameters:
- 1: Name of the author
- 2: Author's photo address (always starting from the main index).
- 3: Citations related to that author as an array of strings.

Each object for quotation is as follows:
- First, you put the quote itself as a string in the "quote" attribute.
- In the "tags" feature, you can write the tags related to this quote as a string.

Note: when you create this "Author" object, it automatically displays the author name and tags used in the citations in the search filter.

# Licence
The licence for this project is MIT.
If you want to see it, just [click here](https://github.com/AryaFardmanesh/Pickit/blob/main/LICENSE).
