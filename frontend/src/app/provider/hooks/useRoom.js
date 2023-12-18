import React, {useEffect, useState} from "react";
import RoomService from "../../services/RoomService";


export default function useRoom() {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [roomData, setRoomData] = useState({});

    async function getRooms() {
        setIsLoading(true)
        try {
            const response = await RoomService.getRooms()
            setRooms(response.data)
        } catch (e) {
            console.error(e);
            // setError(e.response?.data?.message)
        } finally {
            setIsLoading(false)
        }
    }

    async function getRoom(roomHash) {
        setIsLoading(true)
        try {
            const response = await RoomService.getRoom(roomHash)
            setRoomData(response.data.room)
        } catch (e) {
            // console.log(e.response?.data?.message);
            setError(e.response?.data?.message)
        } finally {
            setIsLoading(false)
        }
    }


    return ({
        rooms,
        roomData,
        error,
        isLoading,
        getRooms,
        getRoom,
    })
}