const connection = require('../config/connection'); // koneksi ke db

module.exports = {
    getUserLogin(email, password){

        return connection('sil_user').where({
            user_email: email,
            user_password:  password,
            user_type: 1
        }).select('user_id', 'user_company_id', 'user_email', 'user_name', {lang: 'user_lang'}, 'user_img').limit(1);

    },
    updateUserLastLogin(email, data){

        connection.transaction(function(trx) {
            connection('sil_user')
            .where('user_email', '=', email)
            .update(data)
            .transacting(trx)
            .then(trx.commit)
            .catch(trx.rollback);
        })
        .then(function(res) {
            return res;
        })
        .catch(function(err) {
            return err;
        });

    },
    getUserAll(){

        return connection.select().from('sil_user');
    
    },
    getUserDetail(id){

        return connection.select().from('sil_user')
        .where('user_id', '=', id);

    },
    getUserFilter(str){

        return connection.select().from('sil_user')
        .where('user_name', 'ilike', '%'+str+'%')
        .orWhere('user_email', 'ilike', '%'+str+'%');

    },
    insertUser(data){

        connection.transaction(function(trx) {
            connection('sil_user')
            .insert(data)
            .transacting(trx)
            .then(trx.commit)
            .catch(trx.rollback);
        })
        .then(function(res) {
            return res;
        })
        .catch(function(err) {
            return err;
        });

    },
    updateUser(id, data){

        connection.transaction(function(trx) {
            connection('sil_user')
            .where('user_id', '=', id)
            .update(data)
            .transacting(trx)
            .then(trx.commit)
            .catch(trx.rollback);
        })
        .then(function(res) {
            return res;
        })
        .catch(function(err) {
            return err;
        });

    },
    deleteUser(id){

        connection.transaction(function(trx) {
            connection('sil_user')
            .where('user_id', '=', id)
            .del()
            .transacting(trx)
            .then(trx.commit)
            .catch(trx.rollback);
        })
        .then(function(res) {
            return res;
        })
        .catch(function(err) {
            return err;
        });

    },
    getUserEmail(email){

        return connection.select('user_id').from('sil_user')
        .where('user_email', '=', email).limit(1);

    },
    updatePasswordUserByEmail(email, data){
        connection.transaction(function(trx) {
            connection('sil_user')
            .where('user_email', '=', email)
            .update(data)
            .transacting(trx)
            .then(trx.commit)
            .catch(trx.rollback);
        })
        .then(function(res) {
            return res;
        })
        .catch(function(err) {
            return err;
        });
    }
}