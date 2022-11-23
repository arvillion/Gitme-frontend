import { useRouteError } from "react-router-dom";
import Alert from "../../components/Alert";

export default function GeneralError() {
	const error = useRouteError()
	return <Alert variant="red">{error.message}</Alert>
}