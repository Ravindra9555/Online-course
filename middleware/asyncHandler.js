
const asynchandler = (request) => (req, req, next) => {
    return (req, res, next) => {
        Promise.resolve(request(req, res, next)).catch((err) => next(err))
    }
}
export default asynchandler;