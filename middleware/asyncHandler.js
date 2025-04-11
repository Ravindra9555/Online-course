const asynchandler = (request) => {
    return (req, res, next) => {
        Promise.resolve(request(req, res, next)).catch(next);
    };
};

export default asynchandler;
