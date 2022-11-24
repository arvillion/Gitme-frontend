import { useState } from "react";
import { Form, useActionData, useFetcher, useRouteLoaderData } from "react-router-dom";
import Alert from "../../components/Alert";
import Button, { LoadingButton } from "../../components/Button";
import Input from "../../components/Input";
import Modal from "../../components/Modal";



export default function Settings() {
	const { repoInfo } = useRouteLoaderData("repoRoot")
	const fetcher = useFetcher()
	const msg = fetcher.data
	const [currentModal, setCurrentModal] = useState('')

	return <div className="space-y-6">
		<div>
			<div className="py-3 text-3xl">General</div>
			<div className="space-y-3">

				<div>
					<label className="font-bold mb-2 block">Repository name</label>
					<div className="flex">
						<Input className="flex-1 mr-2"/>
						<Button variant="light">Rename</Button>
					</div>
				</div>

				<div className="border border-gray-300 rounded flex flex-col divide-y divide-gray-300">

					<div className="py-4 px-5 flex justify-between items-center">
						<div className="flex flex-col justify-between">
							<div className="font-bold mb-1">Edit repository details</div>
							<div className="text-sm">Update description.</div>
						</div>
						<div>
							<Button variant="light">Edit</Button>
						</div>
					</div>

				</div>

			</div>
		</div>
		<div>
			<div className="py-3 text-3xl">Danger Zone</div>
			<div className="border border-red-300 rounded flex flex-col divide-y divide-gray-300">

				<div className="py-4 px-5 flex justify-between items-center">
					<div className="flex flex-col justify-between">
						<div className="font-bold mb-1">Change repository visibility</div>
						<div className="text-sm">This repository is currently private.</div>
					</div>
					<div>
						<Button variant="red">Change visibility</Button>
					</div>
				</div>


				<div className="py-4 px-5 flex justify-between items-center">
					<div className="flex flex-col justify-between">
						<div className="font-bold mb-1">Delete this repository</div>
						<div className="text-sm">Once you delete a repository, there is no going back. Please be certain.</div>
					</div>
					<div>
						<Button variant="red" onClick={() => setCurrentModal('delete')}>Delete this repository</Button>
					</div>
				</div>

				<Modal title="Are you sure to delete this repository?" 
					show={currentModal === 'delete'} 
					showSubmitBtn={false}
					handleClose={() => setCurrentModal('')}
					showCloseBtn={fetcher.state === 'idle'}
				>
					{msg?.type === 'delete' && fetcher.state === 'idle' && <Alert className="mb-2" variant="red">{msg.err}</Alert>}
					<fetcher.Form action="/_repo.delete" method="post">
						<input type="hidden" value={repoInfo.id} name="repoId"/>
						<LoadingButton variant="red" className="w-full" loading={fetcher.state !== 'idle'}>Yes, I'm sure</LoadingButton>
					</fetcher.Form>
				</Modal>

			</div>
		</div>
	</div>
}