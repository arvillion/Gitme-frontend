import { editMyProfile, getMyRepos, getStarredRepos, getUserInfo, getUserRepos } from "../utils/api";

export async function userDataLoader({ params }) {
	const username = params?.userName
	const myName = localStorage.getItem('userName')
	const email = localStorage.getItem('email')
	const token = localStorage.getItem('token')

	if (!token) return { profile: {}, repos: [], starredRepos: [] }

	const infoPromise = username ? getUserInfo({ name: username, token }) : getUserInfo({ mail: email, token })
	const reposPromise = (username && username !== myName) ? getUserRepos({ username, token }) : getMyRepos({ token })

	const [
		{ data: profile },
		{ data: repos },
		{ data: starredRepos },
	] = await Promise.all([ infoPromise, reposPromise, getStarredRepos({ token }) ])

	console.log(starredRepos)	
	return { 
		profile,
		repos
	}
}

export async function editProfileAction({ params, request }) {
	const formData = await request.formData()
	const bio = formData.get('bio')
	const phone = formData.get('phone')
	const token = localStorage.getItem('token') 

	try {
		console.log('doing')
		await editMyProfile({ token, bio, phone })
		return { err: '' }
	} catch(err) {
		return { err: err.message }
	}
}

export async function userProfileLoader() {
	const email = localStorage.getItem('email')
	const token = localStorage.getItem('token') 
	if (!token) {
		return null
	}
	const { data: profile } = await getUserInfo({
			email,
			token,
	})
	return { profile }
}
