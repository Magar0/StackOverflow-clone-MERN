import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import styles from './card.module.css'

const Card = ({ plan, makePayment, user, cancelPlan }) => {

    const navigate = useNavigate();


    const userPlan = user?.plan

    const planId = {
        silver: "price_1Om6ONSF7DtpT7vMDUxUgwMq",
        gold: "price_1Om6NzSF7DtpT7vMcoVStWzJ"
    }

    const handleClick = () => {
        if (user) {
            if (plan.name === "silver") {
                makePayment({ priceId: planId.silver, plan: "silver" })
            } else if (plan.name === "gold") {
                makePayment({ priceId: planId.gold, plan: "gold" })
            } else if (plan.name === "free") {
                cancelPlan()
            }
        } else {
            alert("Login to subscribe plan")
            navigate('/auth')
        }
    }
    return (
        <div className={styles.card}>
            <div className={styles.top}>
                <h1>{plan.name} Plan</h1>
                {
                    userPlan === plan.name && <p className={styles.currentPlan}>Current Plan</p>
                }
            </div>
            <div className={styles.mid}>
                <h5>What's included:</h5>
                <ul>
                    {plan.details.map((item, ind) => (
                        <li key={ind}> {item} </li>
                    ))}
                </ul>
            </div>
            <div className={styles.bot}>
                {plan?.price && <h5>&#8377; {plan.price}/-</h5>}
                <button disabled={userPlan === plan.name} onClick={handleClick} className={`${(userPlan !== plan.name) ? styles.btn : null}`}>Subscribe</button>
            </div>
        </div>
    )
}

export default Card