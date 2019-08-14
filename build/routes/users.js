var express_1 = require('express');
var app = express_1.default();
var router = express_1.Router();
var Log_1 = require('../logger/Log');
app.use(express_1.json());
router.get('/', async(request, response), {
    let: users = await, userService: .getUser(request.body),
    response: .json({
        data: users
    })
});
router.post('/', async(request, response), {
    try: {
        const: user = await, userService: .addUser(request.body),
        response: .send({
            data: user
        })
    }, catch: function (e) {
        Log_1.default.error(e);
        response.send({
            error: e.message
        });
    }
});
router.get('/:id', function (req, res) {
    res.send('Hello Wordddld');
});
exports.default = router;
