import { getPasswords, getPasswordById } from './passwords.selector';

const STATE_MOCK = {
  passwords: {
    data:[
      {id: 1, url: 'google.com', password: 'password', username: 'username'},
      {id: 3, url: 'facebook.com', password: 'fb', username: 'mark'},
      {id: 5, url: 'intelliarts.com', password: 'hive', username: 'ia'},
    ]
  }
}

describe('passwords.selector', () => {
  describe('getUsers', () => {
    it('should return passwords', () => {
      const actual = getPasswords(STATE_MOCK)

      expect(actual).toEqual([
        {id: 1, url: 'google.com', password: 'password', username: 'username'},
        {id: 3, url: 'facebook.com', password: 'fb', username: 'mark'},
        {id: 5, url: 'intelliarts.com', password: 'hive', username: 'ia'},
      ])
    });

    it('should return an empty array in case there is no passwords', () => {
      const actual = getPasswords({})

      expect(actual).toEqual([])
    });

    describe('getPasswordById', () => {
      it('should return record by id', () => {
        const actual = getPasswordById(STATE_MOCK, 5)

        expect(actual).toEqual( {id: 5, url: 'intelliarts.com', password: 'hive', username: 'ia'})
      });

      it('should return an empty object in case record not found', () => {
        const actual = getPasswordById(STATE_MOCK, 100)

        expect(actual).toEqual( {})
      });

      it('should return an empty object in case record there is no passwords', () => {
        const actual = getPasswordById({}, 100)

        expect(actual).toEqual({})
      });
    });
  });
});
