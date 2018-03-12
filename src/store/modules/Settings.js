const state = {
    backupCodes: [{
        code: 'FDOA2048MS',
        used: true
    }, {
        code: 'DOA2048MSF',
        used: true
    }, {
        code: 'OA2048MSFD',
        used: true
    }, {
        code: 'A2048MSFDO',
        used: false
    }, {
        code: '2048MSFDOA',
        used: false
    }, {
        code: '048MSFDOA2',
        used: true
    }, {
        code: '48MSFDOA20',
        used: false
    }, {
        code: '8MSFDOA204',
        used: false
    }, {
        code: 'MSFDOA2048',
        used: false
    }, {
        code: 'SFDOA2048M',
        used: false
    }],
    changePassword: {
        old: '',
        new: '',
        repeat: ''
    }
}

const mutations = {
    SET_OLD_PASSWORD(state, oldPassword) {
        state.changePassword.old = oldPassword;
    },
    SET_NEW_PASSWORD(state, newPassword) {
        state.changePassword.new = newPassword
    },
    SET_REPEAT_PASSWORD(state, repeatPassword) {
        state.changePassword.repeat = repeatPassword;
    },
    GENERATE_NEW_BACKUP_CODES(state) {
        var code = {}
        var check = false
        for (let i = 0; i < state.backupCodes.length; i++) {
            if (state.backupCodes[i].used) {
                code = {
                    code: Math.random().toString(36).substr(2, 10).toUpperCase(),
                    used: false
                }
                state.backupCodes.splice(i, 1, code)
                check = true
                break
            }
        }
        if (!check) {
            state.backupCodes = []
            for (let i = 0; i < 10; i++) {
                code = {
                    code: Math.random().toString(36).substr(2, 10).toUpperCase(),
                    used: false
                }
                state.backupCodes.push(code)
            }
        }
    }
}

export default {
    state,
    mutations
}
