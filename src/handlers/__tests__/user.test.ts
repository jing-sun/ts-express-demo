import * as user from '../user'

describe(`user handler`, () => {
  it(`should do something when something happens`, () => {
    expect(1).toBe(1)
  })

  it(`should create a new user`, async () => {
    const req = {
      body: {
        username: 'fullname1',
        password: '123'
      }
    }

    const res = {
      json({token}) {
        console.log(token)
        expect(token).toBeTruthy() // is this actually working as expected?
      }
    }

    const newUser = await user.createNewUser(req, res, () => {})
  })
})