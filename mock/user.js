
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  // user login
  {
    url: '/vue-element-admin/user/login',
    type: 'post',
    response: config => {
      return {
        errno: 0,
        data: {
          roles: [
            'USER_MANAGE',
            'ROLE_MANAGE',
            'OPT_MANAGE'
          ],
          userinfo: {
            'id': 1,
            'username': 'admin',
            'realname': '超级管理员',
            'roleid': 1,
            'unit': '',
            'comment': null,
            'status': 1,
            'lastlogin_ip': '::ffff:127.0.0.1',
            'lastlogin_time': '2022-06-07 08:57:02',
            'create_time': null,
            'update_time': null,
            'rolename': '系统管理员',
            'issimplepwd': true
          }
        }
      }
    }
  },

  // get user info
  {
    url: '/vue-element-admin/user/info\.*',
    type: 'get',
    response: config => {
      return {
        errno: 0,
        data: {
          roles: [
            'USER_MANAGE',
            'ROLE_MANAGE',
            'OPT_MANAGE'
          ],
          userinfo: {
            'id': 1,
            'username': 'admin',
            'realname': '超级管理员',
            'roleid': 1,
            'unit': '',
            'comment': null,
            'status': 1,
            'lastlogin_ip': '::ffff:127.0.0.1',
            'lastlogin_time': '2022-06-07 08:57:02',
            'create_time': null,
            'update_time': null,
            'rolename': '系统管理员',
            'issimplepwd': true
          }
        }
      }
    }
  },

  // user logout
  {
    url: '/vue-element-admin/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
