import { getCommits, getRepoIdByUserNameAndRepoName } from "../utils/api"

export async function commitsLoader({ params, request }) {
	const { userName, repoName, branchId } = params
	const token = localStorage.getItem('token')
	const { data: repoId } = await getRepoIdByUserNameAndRepoName({ token, userName, repoName })
	const { data: commits } = await getCommits({ branchId, token, repoId })
	console.log(commits)
}