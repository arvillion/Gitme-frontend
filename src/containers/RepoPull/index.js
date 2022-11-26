import { faCodeMerge, faCodePullRequest } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import dayjs from "dayjs"
import { Link, useLoaderData, useParams } from "react-router-dom"
import UserLink from "../../components/UserLink"
import { commitLoader } from "../../routes/commits"

// date
// : 
// "2022-11-25 20:33:04"
// diff
// : 
// null
// fromBranch
// : 
// "master"
// fromRepoId
// : 
// 27
// id
// : 
// 2
// state
// : 
// "UNPROCESS"
// title
// : 
// "add 3.pdf"
// toBranch
// : 
// "master"
// toRepoId
// : 
// 26
// userName
// : 
// "123"

const prState = {
	UNPROCESS: 'UNPROCESS',
	ACCEPT: 'ACCEPT',
	REJECT: 'REJECT',
}

export default function RepoPull () {
	const { pr } = useLoaderData()
	const { userName, repoName } = useParams()
	const isMerged = pr.state === 'ACCEPT'
	return <>
	<div className="pb-3 border-b border-gray-300">
		<h1 className="text-3xl py-3">
			{pr.title} <span className="text-gray-600">#{pr.id}</span>
		</h1>
		
		<div className="flex space-x-3 items-center text-gray-500">
			{(pr.state === prState.UNPROCESS) ? 
			<div className="rounded-full py-1.5 px-3 bg-green-600 text-white flex items-center">
				<FontAwesomeIcon icon={faCodePullRequest} className="w-4 h-4 mr-1.5"/>Open
			</div> : (pr.state === prState.ACCEPT) ?
			<div className="rounded-full py-1.5 px-3 bg-purple-600 text-white flex items-center">
				<FontAwesomeIcon icon={faCodeMerge} className="w-4 h-4 mr-1.5"/>Merged
			</div> : 
			<div className="rounded-full py-1.5 px-3 bg-red-600 text-white flex items-center">
				<FontAwesomeIcon icon={faCodePullRequest} className="w-4 h-4 mr-1.5"/>Rejected
			</div>}
			<div>
				<strong>
					<UserLink userName={pr.userName}/>
				</strong> wants to merge commits into <BranchBadge userName={userName} repoName={repoName} branchId={pr.fromBranch}/> from <BranchBadge userName={pr.userName} repoName={3} branchId={pr.toBranch}/>  
			</div>
			<div style={{marginLeft: 'auto'}} className="hidden lg:block">
				Created {dayjs(pr.date).fromNow()}
			</div>
		</div>
		<div className="text-gray-500 mt-2 lg:hidden">
			Created {dayjs(pr.date).fromNow()}
		</div>
	</div>
	</>
}

function BranchBadge({
	repoName,
	userName,
	branchId,
}) {
	return <Link to={`/${userName}/${repoName}/source/${branchId}`}
		className="text-blue-500 bg-blue-50 px-1.5 py-1 rounded"
	>{userName}:{branchId}</Link>
}