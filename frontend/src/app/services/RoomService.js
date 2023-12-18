import $api from "../http";

export default class RoomService {
    static async getRooms() {
        return $api.get('/room');
    }
    static async createRoom() {
        return $api.post('/room', {});
    }
    static async getRoom(roomHash) {
        return $api.get(`/room/${roomHash}`);
    }
}