import { faCircleDot } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import avatar from '../../images/avatar.png'
import { mdRaw } from "./testdata";
import './style.css'

export default function RepoIssue() {
	return <>
		
		<div className="pb-3 border-b border-gray-300">
			<h1 className="text-3xl py-3">
				Missing undefined in the list of possible return types of render function <span className="text-gray-600">#5261</span>
			</h1>
			<div className="flex space-x-3 items-center text-gray-500">
				<div className="rounded-full py-1.5 px-3 bg-green-600 text-white flex items-center">
					<FontAwesomeIcon icon={faCircleDot} className="w-4 h-4 mr-1.5"/>Open
				</div>
				<div>
					<strong>croraf</strong> opened this issue 2 days ago
				</div>
				<div>3 comments</div>
			</div>
		</div>
		<div className="py-4 space-y-4">
			<div className="flex flex-row">
				<div className="mr-4 rounded-full overflow-hidden sm:w-10 sm:h-10 md:w-16 md:h-16 hidden sm:block shrink-0">
					<img src={avatar} className="w-full"/>
				</div>
				<div className="rounded border border-gray-300 relative commentBox before:bg-gray-300 after:bg-gray-100 before:hidden after:hidden sm:before:block sm:after:block">
					<div className="bg-gray-100 px-5 py-2 text-gray-600 border-b border-gray-300">
						<strong className="text-black">dwolrdcojp</strong> commented 18 days ago
					</div>
					<article className="p-5 prose max-w-none">

						<ReactMarkdown children={mdRaw} remarkPlugins={[remarkGfm]}
							components={{
								code({node, inline, className, children, ...props}) {
									const match = /language-(\w+)/.exec(className || '')
									return !inline && match ? (
										<SyntaxHighlighter
											children={String(children).replace(/\n$/, '')}
											style={materialLight}
											language={match[1]}
											PreTag="div"
											className="rounded overflow-hidden"
											{...props}
										/>
									) : (
										<code className={className} {...props}>
											{children}
										</code>
									)
								}
							}}
						/>
					</article>
				</div>
			</div>



			<div className="flex flex-row">
				<div className="mr-4 rounded-full overflow-hidden sm:w-10 sm:h-10 md:w-16 md:h-16 hidden sm:block shrink-0">
					<img src={avatar} className="w-full"/>
				</div>
				<div className="rounded border border-gray-300 relative commentBox before:bg-gray-300 after:bg-gray-100 before:hidden after:hidden sm:before:block sm:after:block">
					<div className="bg-gray-100 px-5 py-2 text-gray-600 border-b border-gray-300">
						<strong className="text-black">dwolrdcojp</strong> commented 18 days ago
					</div>
					<article className="p-5 prose max-w-none">

						<ReactMarkdown remarkPlugins={[remarkGfm]}
							children={`I see what you mean, yeah. The challenge description states that it should crash when pressing "next" on the last picture. But it doesn't ever go to last picture. If nobody has taken this on can I create a PR?`}
							components={{
								code({node, inline, className, children, ...props}) {
									const match = /language-(\w+)/.exec(className || '')
									return !inline && match ? (
										<SyntaxHighlighter
											children={String(children).replace(/\n$/, '')}
											style={materialLight}
											language={match[1]}
											PreTag="div"
											className="rounded overflow-hidden"
											{...props}
										/>
									) : (
										<code className={className} {...props}>
											{children}
										</code>
									)
								}
							}}
						/>
					</article>
				</div>
			</div>


		</div>
	</>
}