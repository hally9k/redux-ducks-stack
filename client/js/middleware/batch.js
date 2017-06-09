function createBatchMiddleware() {
    return ({ dispatch }) => (next) => (action) => {
        return Array.isArray(action)
            ? action.forEach((x) => dispatch(x))
            : next(action);
    };
}

const batchMiddleware = createBatchMiddleware();

export default batchMiddleware;
