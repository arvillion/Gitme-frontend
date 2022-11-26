import { useParams } from "react-router-dom"
import { getAllBranches, getPullRequestById, getPullRequests, getRepoIdByUserNameAndRepoName, getRepoInfo } from "../utils/api"

export async function prsLoader({ params }) {
	const token = localStorage.getItem('token')
	const { userName, repoName } = params
	const { data: repoId } = await getRepoIdByUserNameAndRepoName({ userName, repoName, token })
	const { data: prs } = await getPullRequests({ repoId, token })
	return { prs }
}

export async function prLoader({ params }) {
	const token = localStorage.getItem('token')
	const { prId } = params
	const { data: pr } = await getPullRequestById({ prId, token })
	console.log(pr)
	return { pr }
}

export async function newPrLoader({ params }) {
	const { userName, repoName } = params
	const token = localStorage.getItem('token')
	const { data: repoId } = await getRepoIdByUserNameAndRepoName({ userName, repoName, token })
	const { data: repoInfo } = await getRepoInfo({ token, repoId })
	if (repoInfo.forkFromRepoName && repoInfo.forkFromUserName) {
		const { data: oriRepoId } = await getRepoIdByUserNameAndRepoName({ repoName: repoInfo.forkFromRepoName, userName: repoInfo.forkFromUserName, token })
		// const [branches, oriBranches] = Promise.all([
		// 	getAllBranches({ token, repoId }),
		// 	getAllBranches({ token, oriRepoId }),
		// ])
		const { data: oriBranches } = await getAllBranches({ token, repoId: oriRepoId })
		const oriDefaultBranch = oriBranches.find(b => b.default)
		return { oriRepoId, oriBranches, oriDefaultBranch }
	} else {
		return { }
	}
	
}

export async function newPrAction({ params, request }) {
	const token = localStorage.getItem('token')
	const formData = await request.formData()

	const fromBranchId = formData.get('fromBranchId')
	const toBranchId = formData.get('toBranchId')
	const fromRepoId = formData.get('fromRepoId')
	const toRepoId = formData.get('toRepoId')
	const title = formData.get('title')
	console.log(fromBranchId, toBranchId, fromRepoId, toRepoId, title)
	return { err: 'saass' }

}