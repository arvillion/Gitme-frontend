import { getPullRequests, getRepoIdByUserNameAndRepoName } from "../utils/api"

export async function prsLoader({ params }) {
	const token = localStorage.getItem('token')
	const { userName, repoName } = params
	const { data: repoId } = await getRepoIdByUserNameAndRepoName({ userName, repoName, token })
	const { data: prs } = await getPullRequests({ repoId, token })
	console.log(prs)
}