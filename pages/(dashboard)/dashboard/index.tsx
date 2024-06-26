import DashBoardTop from '@/components/dashboard/dashboard/DashBoardTop'
import PopularInstructors from '@/components/dashboard/dashboard/PopularInstructors'
import RecentCourses from '@/components/dashboard/dashboard/RecentCourses'
import Statistics from '@/components/dashboard/dashboard/Statistics'
import Traffic from '@/components/dashboard/dashboard/Traffic'
import { states } from '@/data/dashBoard'
import { teamMembers } from '@/data/instructors'
import { resentCourses } from '@/data/courses'
import { notifications } from '@/data/notifications'
import React, { useEffect } from 'react'
import Notifications from '@/components/dashboard/dashboard/Notifications'
import DashboardLayout from '@/components/dashboard/dashboardLayout/DashboardLayout'
import { useSelector, useDispatch } from 'react-redux'
import { userActions } from '@/store/slices/userSlice'
import { useRouter } from 'next/navigation'
import { RootState } from '@/utils/type.dt'
import Head from 'next/head'

const DashBoard: React.FC = () => {
  const dispatch = useDispatch()
  const { setUserData } = userActions
  const { userData } = useSelector((states: RootState) => states.userStates)

  const router = useRouter()

  useEffect(() => {
    if (!userData) {
      const sessionUser = JSON.parse(sessionStorage.getItem('user')!)
      if (sessionUser) {
        dispatch(setUserData(sessionUser))
      }
    }
  }, [dispatch, setUserData, userData])

  if (userData?.userType === 'user') {
    router.push('/(dashboard)/purchases')
  }
  if (userData?.userType === 'instructor') {
    router.push('/(dashboard)/products/personal')
  }

  return (
    userData?.userType === 'admin' && (
      <>
        <Head>
          <title>Dashboard | People Learn</title>
          <meta
            name="description"
            content="Welcome to the People Learn dashboard. Manage your courses, view statistics, and interact with the community."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://peoplelearn.io/dashboard" />
          <meta property="og:title" content="Dashboard | People Learn" />
          <meta
            property="og:description"
            content="Welcome to the People Learn dashboard. Manage your courses, view statistics, and interact with the community."
          />
          <meta
            property="og:image"
            content="https://file.dappmentors.duckdns.org/download/image/1709450883536__fcix.png"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@peoplelearn" />
          <meta name="twitter:title" content="Dashboard | People Learn" />
          <meta
            name="twitter:description"
            content="Welcome to the People Learn dashboard. Manage your courses, view statistics, and interact with the community."
          />
          <meta
            name="twitter:image"
            content="https://file.dappmentors.duckdns.org/download/image/1709450883536__fcix.png"
          />
        </Head>

        <DashboardLayout>
          <div className="px-5">
            <DashBoardTop states={states} />
            <div className="flex flex-col md:flex-row justify-between mt-10 gap-8 md:gap-0">
              <Statistics />
              <Traffic />
            </div>
            <div className="flex flex-col md:flex-row gap-8 mt-10">
              <div className="space-y-8">
                <PopularInstructors teamMembers={teamMembers} />
                <Notifications notifications={notifications} />
              </div>
              <RecentCourses resentCourses={resentCourses} />
            </div>
          </div>
        </DashboardLayout>
      </>
    )
  )
}

export default DashBoard
