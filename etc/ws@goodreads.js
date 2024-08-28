// Only working for this "url https://www.goodreads.com/"
// Like this: "https://www.goodreads.com/author/quotes/756.Warren_Buffett"
function goFetch(name = '') {
	let imgName = '';
	name.split(' ').forEach(pn => {
		pn = pn.trim();
		pn = pn[0].toUpperCase() + pn.slice(1);
		imgName += pn;
	});

	const quotesBox = [];
	const quoteElements = document.querySelectorAll('.quotes .quoteText');

	for (const qelm of quoteElements) {
		let quoteText = qelm.innerText;
		quoteText = quoteText.slice(quoteText.indexOf('“') + 1, quoteText.lastIndexOf('”'));
		quoteText = quoteText.replaceAll('\n', '');
		quoteText = quoteText.replaceAll('\r', '');
		quoteText = quoteText.replaceAll('`', '\'');
		quoteText = quoteText.trim();
		quotesBox.push(quoteText);
	}

	let struct = ``;
	struct += `new Author(\n`;
	struct += `\t"${name}",\n`;
	struct += `\t"/img/profile/${imgName}.*",\n`;
	struct += `\t[\n`;
	for (const quote of quotesBox) {
		struct += `\t\t{\n`;
		struct += `\t\t\tquote: \`${quote}\`,\n`;
		struct += `\t\t\ttags: [\n`;
		struct += `\t\t\t\t"",\n`;
		struct += `\t\t\t\t"",\n`;
		struct += `\t\t\t\t"",\n`;
		struct += `\t\t\t\t"",\n`;
		struct += `\t\t\t\t"",\n`;
		struct += `\t\t\t]\n`;
		struct += `\t\t},\n`;
	}
	struct += `\t]\n`;
	struct += `);\n`;

	console.log(struct);
}
