import {useEffect, useState} from "react";
import dayjs from "dayjs";

const Clock = () => {
    const [time, setTime] = useState()

    useEffect(() => {

        setInterval(() => {

            const dateObject = new Date()

            const hour = dateObject.getHours()
            const minute = dateObject.getMinutes()
            const second = dateObject.getSeconds()

            const currentTime = hour + ' : ' + minute + ' : ' + second
            const ct = dayjs().format("DD.MM.YYYY HH:mm:ss")

            setTime(ct)
        }, 1000)

    }, [])
    return <div>
        {time}
    </div>
}

export default Clock