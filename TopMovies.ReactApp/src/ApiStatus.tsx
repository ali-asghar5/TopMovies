type Args = {
    status: "success" | "error" | "pending";
};

const ApiStatus = ({status}: Args) => {
    switch (status) {
        case "error":
            return <div className="alert alert-danger">Error communicating with the data backend</div>;
        case "pending":
            return <div className="alert alert-info">Loading...</div>;
        default:
            throw Error("Unknown API state");
    }
}

export default ApiStatus;