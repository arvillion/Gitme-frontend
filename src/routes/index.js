import { createBrowserRouter, Navigate, redirect } from "react-router-dom";
import App from "../App";
import RepoLayout from "../containers/RepoLayout";
import ProtectedResource from "../components/ProtectedResource";
import GeneralError from "../containers/GeneralError";
import Logout from "../containers/Logout";
import RepoCode from "../containers/RepoCode";
import RepoCommit from "../containers/RepoCommit";
import RepoCommits from "../containers/RepoCommits";
import RepoIssue from "../containers/RepoIssue";
import RepoIssues from "../containers/RepoIssues";
import SigninPage from "../containers/SigninPage";
import SignupPage from "../containers/SignupPage";
import UserPage from "../containers/UserPage";
import repoInfoLoader, { contentLoader, deleteRepoAction, fileContentLoader, forkAction, repoAction, starAction } from "./repo";
import { editProfileAction, userDataLoader } from "./user";
import DefaultBranchRedirect from "../containers/DefaultBranchRedirect";
import NewIssue from "../containers/NewIssue";
import { createIssueAction, issueAction, issueLoader, issueStateAction, newCommentAction } from "./issues";
import Settings from "../containers/Settings";
import Fork from "../containers/Fork";
import RepoPulls from "../containers/RepoPulls";
import { prsLoader } from "./pr";

const router = createBrowserRouter([
	{
		path: '/',
		element: <ProtectedResource><App /></ProtectedResource>,
		children: [
			{
				index: true,
				loader: userDataLoader,
				element: <UserPage me={true}/>
			},
			{
				path: ':userName',
				loader: userDataLoader,
				element: <UserPage />,
				errorElement: <GeneralError />
			},
			{
				path: ':userName/:repoName',
				id: "repoRoot",
				loader: repoInfoLoader,
				errorElement: <GeneralError />,
				element: <RepoLayout />,
				children: [
					{
						index: true,
						element: <Navigate replace={true} to='source'/>
					},
					{
						path: 'source',
						element: <DefaultBranchRedirect/>,
					},
					{
						path: 'fork',
						element: <Fork/>,
						action: forkAction,
					},
					{
						path: 'source/:branchId',
						children: [
							{
								index: true,
								loader: fileContentLoader,
								element: <RepoCode/>
							},
							{
								path: '*',
								loader: fileContentLoader,
								element: <RepoCode/>
							}
						]
					},
					{
						path: 'commits',
						children: [
							{
								path: '',
								element: <RepoCommits />
							},
							{
								path: ':hash',
								element: <RepoCommit />
							}
						]
					},
					{
						path: 'issues',
						children: [
							{
								index: true,
								element: <RepoIssues />
							},
							{
								path: ':issueId',
								loader: issueLoader,
								action: issueAction,
								element: <RepoIssue />
							},
							{
								path: 'new',
								action: createIssueAction,
								element: <NewIssue />
							}
						]
					},
					{
						path: 'pulls',
						children: [
							{
								index: true,
								element: <RepoPulls/>,
								loader: prsLoader,
							}
						]
					},
					{
						path: 'settings',
						element: <Settings/>
					}
				]
			}
		]
	},
	{
		path: '/signin',
		element: <SigninPage />
	},
	{
		path: '/signup',
		element: <SignupPage />
	},
	{
		path: '/logout',
		element: <Logout/>
	},
	{
		path: '_profile.update',
		action: editProfileAction,
	},
	{
		path: '_repo',
		action: repoAction,
	},
	{
		path: '_repo.star',
		action: starAction,
	},
	{
		path: '_repo.delete',
		action: deleteRepoAction,
	}
	// {
	// 	path: '_issue.state',
	// 	action: issueStateAction,
	// }
])

export default router