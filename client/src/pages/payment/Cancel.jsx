import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from './payment.module.css'

const Cancel = () => {
    const [timer, setTimer] = useState(3);
    const navigate = useNavigate();

    useEffect(() => {
        if (timer === 0) {
            navigate('/subscription');
        }
    }, [timer])

    useEffect(() => {

        const interval = setInterval(() => {
            setTimer(pre => pre - 1)
        }, 1000);

        return () => clearInterval(interval)
    }, [])

    return (
        <div className={styles.cancel}>
            <p>Your payment have been canceled. Redirecting in ...{timer}</p>
        </div>
    )
}

export default Cancel;