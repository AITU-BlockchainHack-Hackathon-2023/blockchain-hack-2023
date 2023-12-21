import $api from "../http";

export default class TransactionsService {
    static async getTest() {
        return $api.get('/transaction');
    }
    static async getTransactions(address, blockchain) {
        return $api.get(`/transaction/${address}/group?blockchain=${blockchain}`);
    }
}