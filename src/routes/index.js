import { createBrowserRouter, Navigate, redirect } from "react-router-dom";
import App from "../App";
import RepoLayout from "../containers/RepoLayout";
import ProtectedResource from "../components/ProtectedResource";
import CodeView from "../containers/CodeView";
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
import repoInfoLoader, { contentLoader, repoAction } from "./repo";
import { editProfileAction, userDataLoader } from "./user";
import DefaultBranchRedirect from "../containers/DefaultBranchRedirect";
import NewIssue from "../containers/NewIssue";
import { createIssueAction, issueLoader } from "./issues";

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
						path: 'source/:branchId',
						children: [
							{
								index: true,
								element: <RepoCode/>
							},
							{
								path: '*',
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
								path: '',
								element: <RepoIssues />
							},
							{
								path: ':issueId',
								loader: issueLoader,
								element: <RepoIssue />
							},
							{
								path: 'new',
								action: createIssueAction,
								element: <NewIssue />
							}
						]
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
	}
])

export default router