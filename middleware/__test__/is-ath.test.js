const authMiddleware = require('../is-auth');

it('should throw an error if authorization middleware is not present', () => {
    const req = {
        get: function() {
            return null;
        }
    }

    expect(authMiddleware.bind(this, req, {}, () => {})).toThrow('Not authenticated');
});