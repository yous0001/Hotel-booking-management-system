class AppError extends Error {
    constructor(message, errCode, statusCode) {
        super(message);
        this.errCode = errCode;
        this.statusCode = statusCode;
    }
};

export default AppError