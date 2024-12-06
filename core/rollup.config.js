import typescript from 'rollup-plugin-typescript2';

export default {
	input: 'src/index.ts',
	output: {
		file: 'public/bundle.js',
		format: 'es',
		sourcemap: true
	},
	plugins: [
    typescript() // 使用 TypeScript 插件
  ]
};
