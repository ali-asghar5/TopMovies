import { AxiosError } from "axios"
import Problem from "./types/problem"

type Args ={
    error: AxiosError<Problem>;
}

const ValidationSummary = ({ error }: Args) => {
    if (error.response?.status !== 400) return <></>
    const errors = error.response?.data.errors ?? [];

    return (
        <>
            <div className="text-danger fw-bold">Please fix the following:</div>
            {Object.entries(errors).map(([key, value]) => (
                <ul key={key} className="text-danger">
                    <li>
                        {key}: {value.join(", ")}
                    </li>
                </ul>
            ))}
        </>
    );
}

export default ValidationSummary;