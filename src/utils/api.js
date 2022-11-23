import * as path from "./path"

const API_URL = 'http://106.55.104.82:8080'
const GIT_SERVER = 'http://0.0.0.0'

const fcJSON = (...args) => fetch(...args).then(async response => {
	const data = await response.json()
	const { code, msg = 'Unknown error' } = data
	if (code === 200 && response.ok) {
		return data
	} else {
		throw new Error(msg)
	}
})

const fcJSONAuth = (url, token, conf = {}) => {
	let headers = conf.headers || {}
	headers = {
		...headers,
		'satoken': token,
	}
	return fcJSON(url, {
		...conf,
		headers
	})
} 


export function loginByEmail({
	email,
	pwd
}) {
	return fcJSON(`${API_URL}/user/doLoginEmail`, {
		method: 'POST',
		body: JSON.stringify({ email, pwd }),
		headers: {
			'content-type': 'application/json'
		}
	})
		.then(data => {
			const { tokenValue, tokenTimeout } = data.data
			return { email, tokenTimeout, tokenValue }
		})
}

export function register({
	email,
	pwd,
	username,
}) {
	return fcJSON(API_URL + '/user/register', {
		method: 'POST',
		body: JSON.stringify({ email, pwd, name: username }),
		headers: {
			'content-type': 'application/json'
		}
	}).then(data => {
		return true
	})
}

export function getUserInfo({ name, mail, token }) {
	if (mail)
		return fcJSONAuth(API_URL + '/user/getUserInfo?' + `mail=${mail}`, token)
	else 
		return fcJSONAuth(API_URL + '/user/getUserInfo?' + `name=${name}`, token)
}

export function getMyRepos({ token }) {
	return fcJSONAuth(API_URL + '/repo/getRepoByMyself', token)
}

export function getUserRepos({ username, token }) {
	return fcJSONAuth(API_URL + '/repo/getRepoByUserName?' + `userName=${username}`, token)
}

export function editMyProfile({ token, bio, phone }) {
	// return fcJSONAuth(API_URL + '/user/editMyInfo', token, {
	// 	method: "POST",
	// 	headers: {
	// 		'content-type': 'application/json',
	// 	},
	// 	body: JSON.stringify({ bio, phoneNumber: phone })
	// })
	return fcJSONAuth(API_URL + '/user/editMyInfo?' + new URLSearchParams({
		bio,
		phoneNumber: phone,
		sex: "8"
	}), token, {
		method: "POST"
	})
}

export function getRepoIdByUserNameAndRepoName({ userName, repoName, token }) {
	return fcJSONAuth(API_URL + '/repo/getRepoIDByCreator_NameAndRepo_Name?'
		+ new URLSearchParams({ cName: userName, rName: repoName })
	, token)
}

export function getAllBranches({ repoId, token }) {
	return fcJSONAuth(API_URL + '/repo/view/getAllBranchByRepoID?repoID=' + repoId, token)
}

export function getDirStructure({ commitId, dir, repoId, token }) {
	return fcJSONAuth(API_URL + '/repo/view/ls?'
		+ new URLSearchParams({ commitID: commitId, dir, repoID: repoId })
	, token)
}

export function getRepoInfo({ repoId, token }) {
	return fcJSONAuth(API_URL + '/repo/view/getRepoByRepoID?repoID=' + repoId, token)
}

export function getDir({ repoId, commitId, dir, token }) {
	return fcJSONAuth(API_URL + '/repo/view/ls?'
	 + new URLSearchParams({ commitID: commitId, dir, repoID: repoId }), token)
}

export function getFile({ repoId, commitId, filePath, token }) {
	return fcJSONAuth(API_URL + '/repo/view/getFileByPath?'
	 + new URLSearchParams({ branchName: commitId, filePath, repoID: repoId }), token)
}

export function createRepository({ repoName, state, desc, token }) {
	return fcJSONAuth(API_URL + '/repo/iniRepo?'
	 + new URLSearchParams({ repoName, state, desc }), token, {
		method: 'POST'
	 })
}

export function getIssues({ repoId, token }) {
	return fcJSONAuth(API_URL + '/issue/getAllIssueByRepoID?repoID=' + repoId, token)
}

export function getCloneUrl({ repoName, userName, token }) {
	return getUserInfo({ name: userName, token }).then(({ data: {mail} }) => mail )
		.then(mail => path.join(GIT_SERVER, 'repo', mail, repoName))
}

export function createIssue({ repoId, title, body, token }) {
	// return fcJSONAuth(API_URL + '/issue/addIssue?'
	// 	+ new URLSearchParams({ repoID: repoId, title }), token, {
	// 		method: 'POST',
	// 		body: body
	// 	})
	return fcJSONAuth(API_URL + '/issue/addIssue?', token, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				repoID: repoId,
				issue: title,
				comment: body,
			})
		})
}

export function getComments({ issueId, token }) {
	return fcJSONAuth(API_URL + '/comment/getCommentByIssueID?issueID' + issueId, token)
}

export function getStarredRepos({ token }) {
	return fcJSONAuth(API_URL + '/repo/getRepoByMyStar', token)
}

export function starRepo({ token, repoId }) {
	return fcJSONAuth(API_URL + '/star/addStar?repoID=' + repoId, token, {
		method: 'POST',
	})
}
export function undoStarRepo({ token, repoId }) {
	return fcJSONAuth(API_URL + '/star/deleteStarsByRepo?repoID=' + repoId, token, {
		method: 'DELETE',
	})
}

export function getIssueInfo({ token, issueId, repoId }) {
	return fcJSONAuth(API_URL + '/issue/findByRepoIDAndIdWithinRepo?'
		+ new URLSearchParams({ issueId, repoID: repoId }), token)
}

export function getIssueCommentsByIssueTrueId({ token, issueTrueId }) {
	return fcJSONAuth(API_URL + '/comment/getCommentByIssueID?issueID=' + issueTrueId, token)
}

// export function downloadZIP({ repoId, branch }) {
// 	return fcJS
// }
