import { redirect } from "react-router-dom"
import { createIssue } from "../utils/api"

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
	
}