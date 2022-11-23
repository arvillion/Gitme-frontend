import SyntaxHighlighter from 'react-syntax-highlighter'
import { githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { javaFileContent } from './testdata'

export default function CodeView () {
	return <div className='space-y-4'>
		<nav class="w-full">
			<ol class="list-reset flex">
				<li className='font-bold'><a href="#" class="text-blue-600 hover:text-blue-700">react-router</a></li>
				<li><span class="text-gray-500 mx-2">/</span></li>
				<li><a href="#" class="text-blue-600 hover:text-blue-700">src</a></li>
				<li><span class="text-gray-500 mx-2">/</span></li>
				<li><a href="#" class="text-blue-600 hover:text-blue-700">example</a></li>
				<li><span class="text-gray-500 mx-2">/</span></li>
				<li class="font-bold text-black">utils.java</li>
			</ol>
		</nav>
		<div className='border border-gray-300 overflow-hidden rounded'>
			<div className='px-4 py-2 flex space-x-3 bg-gray-100 border-b border-gray-300'>
				<div className='font-mono text-sm text-gray-600'>75 lines</div>
				<div className='font-mono text-sm text-gray-600'>1.03 KB</div>
			</div>
			<div className='px-3 pt-2 pb-4 text-sm'>
				<SyntaxHighlighter language="java" style={githubGist}
					showLineNumbers={true}
				>
					{javaFileContent}
				</SyntaxHighlighter>
			</div>
		</div>
	</div>
}