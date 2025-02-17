var config = {
    entry: './main.js',
    
    output: {
	path: './',
	filename: 'bundle.js',
    },
    module: {
	loaders: [
	    {
		test: /\.jsx?$/,
		exclude: /node_modules/,
		loader: 'babel',
		
		query: {
		    presets: ['es2015', 'react']
		}
	    }
	]
    }
}

module.exports = config;
