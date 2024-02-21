import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from './payment.module.css'
import * as api from '../../api/index';
import { updateCurrentUser } from "../../store/slices/currentUserSlice";


const Success = () => {
    const [timer, setTimer] = useState(3);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser)

    const searchParams = new URLSearchParams(window.location.search);
    const sessionId = searchParams.get("session_id")

    if (timer === 0) {
        navigate('/subscription');
    }

    const updatePlan = async () => {
        try {
            const updatedData = await api.changePlan(sessionId);
            dispatch(updateCurrentUser(updatedData.data))
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        updatePlan()
        const interval = setInterval(() => {
            setTimer(pre => pre - 1)
        }, 1000);

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("Profile", JSON.stringify(currentUser))
        }
    }, [currentUser])

    return (
        <div className={styles.success}>
            <p>Your payment have been successful. Redirecting in...{timer}</p>
        </div>
    )
}

export default Success;