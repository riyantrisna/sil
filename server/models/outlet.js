const connection = require('../config/connection'); // koneksi ke db

module.exports = {
    getOutletAll(){

        return connection.select().from('sil_outlet');
    
    },
    getOutletDetail(id){

        return connection.select().from('sil_outlet')
        .where('outlet_id', '=', id);

    },
    getOutletFilter(str){

        return connection.select().from('sil_outlet')
        .where('outlet_name', 'ilike', '%'+str+'%')
        .orWhere('outlet_address', 'ilike', '%'+str+'%');

    },
    insertOutlet(data){

        connection.transaction(function(trx) {
            connection('sil_outlet')
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
    updateOutlet(id, data){

        connection.transaction(function(trx) {
            connection('sil_outlet')
            .where('outlet_id', '=', id)
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
    deleteOutlet(id){

        connection.transaction(function(trx) {
            connection('sil_outlet')
            .where('outlet_id', '=', id)
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
    getOutletByUser(user_id){

        return connection.select('user_outlet').from('sil_user')
        .where('user_id', '=', user_id);

    },
    getOutletByCompanyIdUserId(company_id, outlet){

        return connection.select().from('sil_outlet')
        .where('outlet_company_id', '=', company_id)
        .whereIn('outlet_id', outlet);

    },
}