import { Diff2HtmlUI } from 'diff2html/lib/ui/js/diff2html-ui'
import 'diff2html/bundles/css/diff2html.min.css'
// import 'highlight.js/styles/github.css'
import diff_str from './diff'
import { createRef, useEffect, useState } from 'react'
import { parse } from 'diff2html'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons'
import avatar from '../../images/avatar.png'

export default function RepoCommit() {
	const ref = createRef()
	const configuration = {
		drawFileList: true,
		fileListToggle: false,
	}
	const [diffSum, setDiffSum] = useState({})
	useEffect(() => {
		const diffJson = parse(diff_str)
		setDiffSum({
			changedFiles: diffJson.length,
			additions: diffJson.map(d => d.addedLines).reduce((pv, cv) => pv + cv),
			deletions: diffJson.map(d => d.deletedLines).reduce((pv, cv) => pv + cv)
		})
		const diff2htmlUi = new Diff2HtmlUI(ref.current, diffJson, configuration)
		diff2htmlUi.draw()
		diff2htmlUi.highlightCode()
	}, [])
	return <>
		<div className='overflow-hidden rounded border border-gray-300'>
			<div className='p-3 border-bottom border-gray-600 bg-gray-100'>
				<div className='font-bold text-md mb-2'>[Beta] useImperativeHandle API</div>
				<div className='text-sm'>
					<FontAwesomeIcon icon={faCodeBranch}/>
					<span className='ml-2'>main</span>
				</div>
			</div>
			<div className='p-3 flex space-x-2 text-sm items-center'>
				<div className='rounded-full overflow-hidden w-4 h-4'>
					<img src={avatar} className='w-full'/>
				</div>
				<div className='font-bold'>geaaron</div>
				<div>committed on Oct 6</div>
				<div className='text-xs font-mono text-gray-300 hidden sm:block' style={{marginLeft: 'auto'}}>
					commit 9af5d8df6947dbd25f5819035edb1c1fcad17f5e
				</div>
			</div>
		</div>
		<p className='mt-3 mb-5 font-light text-gray-600'>
			Showing <strong>{diffSum.changedFiles} changed files</strong> with <strong>{diffSum.additions} additions</strong> and <strong>{diffSum.deletions} deletions</strong>.
		</p>
		<div ref={ref}></div>
	</>
}