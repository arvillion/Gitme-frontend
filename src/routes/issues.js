import { redirect } from "react-router-dom"
import { createIssue, getIssueCommentsByIssueTrueId, getIssueInfo, getRepoIdByUserNameAndRepoName, getRepoInfo } from "../utils/api"

export async function createIssueAction({ params, request }) {
	const token = localStorage.getItem('token')
	const repoId = new URLSearchParams(new URL(request.url).search).get('repoId')
	const formData = await request.formData()
	const { userName, repoName } = params
	const title = formData.get('title')
	const body = formData.get('body')
	try {
		if (repoId === null) throw new Error('repoId is empty')
		const { data: issueId } = await createIssue({ repoId, body, title, token })
		return redirect(`/${userName}/${repoName}/issues/${issueId}`)
	} catch (err) {
		console.log(err)
		return { err: err.message }
	}
}

export async function issueLoader({ params, request }) {
	const { issueId, userName, repoName } = params
	const token = localStorage.getItem('token')
	const { data: repoId } = await getRepoIdByUserNameAndRepoName({ userName, repoName, token })
	const {data: issueInfo} = await getIssueInfo({ issueId, token, repoId })

	const issueTrueId = issueInfo.id
	const { data: comments } = await getIssueCommentsByIssueTrueId({ token, issueTrueId })
	console.log(issueInfo, comments)
	return { issueInfo, comments }
}