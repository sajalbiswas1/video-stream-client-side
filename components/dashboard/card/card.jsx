"use client"
import React, { useEffect, useState } from 'react';
import {  FaUser } from 'react-icons/fa';
import { MdPayments } from "react-icons/md";
import StackBars from '@/components/dashboard/chart/stackChart/stackChart';
import ProfileCard from './profile/profileCard';
import WeekLyLineChart from '../chart/lineChart/lineChart';
import axios from 'axios';

const Card = () => {
  const [usersData, setUsersData] = useState([]);
  const [usersPaymentData, setUsersPaymentData] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://endgame-team-server.vercel.app/users');
        setUsersData(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);
  useEffect(() => {
    const fetchPaymentUsers = async () => {
      try {
        const response = await axios.get('https://endgame-team-server.vercel.app/payments');
        setUsersPaymentData(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchPaymentUsers();
  }, []);

  const cards = [
    {
      id: 1,
      title: 'All Users',
      number: usersData?.length,
      color: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
      icon: FaUser,
    },
   
    {
      id: 3,
      title: 'Subscription',
      number: usersPaymentData?.length,
      change: -2,
      color:  'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
      icon:  MdPayments,
    },

   
  ];

  return (
    <div className='flex flex-col'>
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4">
        {/* first column */}
        <div className="lg:col-span-9 flex flex-col gap-4 h-96 w-full">
          {/* card */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between">
            {cards.map((cardItem) => (
              <div
                key={cardItem.id}
                className={`w-full g:w-1/2 p-2 flex flex-col gap-4 rounded-sm`}
                style={{
                  background: `${cardItem.color}`,
                }}
              >
                <div className="flex gap-4 justify-between">
                  <span>{cardItem.title}</span>
                  {cardItem.icon && <span>{<cardItem.icon />}</span>}
                </div>

                <div className="flex gap-4 justify-between">
                  <span>{cardItem.number}</span>
                </div>
              </div>
            ))}
          </div>

          {/* top view */}
          <div className="">
            <WeekLyLineChart style={{background: 'linear-gradient(135deg, #74EBD5 0%, #9FACE6 100%)'}} />
          </div>
        </div>
        {/* second column */}
        <div className="lg:col-span-3 h-96 hidden rounded-md lg:block bg-slate-900">
          <ProfileCard />
        </div>
      </div>
      <StackBars style={{background: 'linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)'}} />
    </div>
  );
};

export default Card;
