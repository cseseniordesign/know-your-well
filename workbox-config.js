module.exports = {
	globDirectory: 'KnowYourWellPWA/',
	globPatterns: [
		'**/*.{json,dll,exe,pdb,cs,csproj,cache,BuildWithSkipAnalyzers,CopyComplete,txt,editorconfig,resources,css,props,targets,sentinel,resx,cshtml,ico,png,js,md}'
	],
	swDest: 'KnowYourWellPWA/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};