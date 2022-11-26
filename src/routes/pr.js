import { getPullRequestById, getPullRequests, getRepoIdByUserNameAndRepoName } from "../utils/api"

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