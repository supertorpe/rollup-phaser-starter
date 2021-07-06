import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import babel from "rollup-plugin-babel";

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		file: 'public/bundle.js',
		format: 'iife', // immediately-invoked function expression — suitable for <script> tags
		strict: false,
		sourcemap: true
	},
	watch: {
		chokidar: {
			paths: 'src/**',
			usePolling: true
		}
	},
	plugins: [
		resolve({browser:true}), // tells Rollup how to find phaser in node_modules
		commonjs({sourceMap:false}), // converts to ES modules
		babel({exclude: "node_modules/**" }), // only transpile our source code
		production && terser() // minify, but only in production
	]
};
