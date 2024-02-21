import { loadStripe } from "@stripe/stripe-js"
import { useDispatch, useSelector } from "react-redux";

import Card from "./card/Card"
import * as api from '../../api/index';
import styles from './subscription.module.css'
import LeftSidebar from '../../component/leftSidebar/LeftSidebar';
import { updateCurrentUser } from "../../store/slices/currentUserSlice";
import { useEffect } from "react";


const Subscription = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.currentUser?.data);

  const makePayment = async (data) => {
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)
    const session = await api.makePayment(data);

    const result = stripe.redirectToCheckout({ sessionId: session?.data.id })
    if (result.error) {
      console.log(await result.error);
    }
  }

  const cancelPlan = async () => {
    const updatedData = await api.cancelSubscription();
    const localStorageData = JSON.parse(localStorage.getItem("Profile"));
    localStorageData.data = updatedData;
    localStorage.setItem("Profile", localStorageData)
    dispatch(updateCurrentUser(updatedData.data))
  }

  const planDetails = [
    {
      id: 1,
      name: "free",
      details: ["can post only 1 question a day.", "can give unlimited answer.", "can vote other questions."]
    },
    {
      id: 2,
      name: "silver",
      details: ["can post 5 questions a day.", "can give unlimited answer.", "can vote other questions."],
      price: 100
    },
    {
      id: 3,
      name: "gold",
      details: ["can post unlimited questions.", "can give unlimited answer.", "can vote other questions."],
      price: 1000
    },
  ]

  return (

    <div className='home-container-1'>
      <LeftSidebar />
      <div className='home-container-2'>
        <div className={styles.container}>
          <p className={styles.planDetails}>Your Current Plan: <span>{user?.plan}</span></p>

          <section className={styles.subscription}>
            {planDetails.map(plan => (
              <Card key={plan.id} plan={plan} makePayment={makePayment} user={user} cancelPlan={cancelPlan} />
            ))}
          </section>

        </div>
      </div>
    </div>

  )
}

export default Subscription



