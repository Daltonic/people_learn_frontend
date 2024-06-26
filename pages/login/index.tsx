'use client'
import { NextPage } from 'next'
import Button from '@/components/reusableComponents/Button'
import InputField from '@/components/reusableComponents/InputField'
import { FaGoogle } from 'react-icons/fa'
import { BsGithub } from 'react-icons/bs'
import AuthLayout from '@/components/layout/authLayout/AuthenticationLayout'
import Link from 'next/link'
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IUser } from '@/utils/type.dt'
import { useRouter as Router } from 'next/router'
import { useDispatch } from 'react-redux'
import { userActions } from '@/store/slices/userSlice'
import Cookies from 'universal-cookie'
import { toast } from 'react-toastify'
import { login } from '@/services/backend.services'
import Head from 'next/head'

const LoginPage: NextPage = () => {
  const dispatch = useDispatch()
  const { setUserData } = userActions
  const cookies = new Cookies()

  const router = useRouter()
  const router_ = Router()

  const [submitting, setSubmitting] = useState<boolean>(false)
  const [passwordType, setPasswordType] = useState<'password' | 'text'>(
    'password'
  )
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  })

  const { user, token } = router_.query

  const afterSuccessfulLogin = (token: string, parsedUser: IUser) => {
    const previousPath = sessionStorage.getItem('prevPath')
    if (!previousPath) {
      router.push('/(dashboard)/dashboard')
    } else {
      router.push(previousPath)
    }

    sessionStorage.setItem('accessToken', token as string)
    sessionStorage.setItem('user', JSON.stringify(parsedUser))
    cookies.set('accessToken', token as String, { path: '/' })

    sessionStorage.removeItem('prevPath')
  }

  // Social Login
  useEffect(() => {
    if (user && token) {
      const parsedUser = JSON.parse(user as string) as IUser

      dispatch(setUserData(parsedUser))
      afterSuccessfulLogin(token as string, parsedUser)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget

    setLoginDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }))
  }

  // Direct login
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    setSubmitting(true)

    const { email, password } = loginDetails

    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        const { user, accessToken } = await login({ email, password })
        if (user && accessToken) {
          dispatch(setUserData(user))

          afterSuccessfulLogin(accessToken, user)
          setLoginDetails({
            email: '',
            password: '',
          })
          setSubmitting(false)
          resolve(user)
        } else {
          setSubmitting(false)
          reject('An error occurred')
        }
      }),
      {
        pending: 'Logging in...',
        success: 'Logged in successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  return (
    <>
      <Head>
        <title>Login | People Learn</title>
        <meta
          name="description"
          content="Sign in to People Learn and start your journey in Blockchain and Web3 Development."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://peoplelearn.io/login" />
        <meta property="og:title" content="Login | People Learn" />
        <meta
          property="og:description"
          content="Sign in to People Learn and start your journey in Blockchain and Web3 Development."
        />
        <meta
          property="og:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709450883536__fcix.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@peoplelearn" />
        <meta name="twitter:title" content="Login | People Learn" />
        <meta
          name="twitter:description"
          content="Sign in to People Learn and start your journey in Blockchain and Web3 Development."
        />
        <meta
          name="twitter:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709450883536__fcix.png"
        />
      </Head>

      <AuthLayout>
        <div className="flex justify-center w-full items-center md:mt-16">
          <div className="bg-white p-5 sm:p-8 w-full md:w-[65%] rounded-md">
            <form onSubmit={handleSubmit}>
              <h3 className="font-medium text-3xl text-[#321463]">Login</h3>
              <p className="md:text-sm text-[#4F547B] mt-1">
                Do not have an account yet?
                <Link href="/signup" className="text-[#C5165D] ml-2">
                  Sign up for free
                </Link>
              </p>
              <InputField
                label="Email"
                name="email"
                placeholder="youremail@domain.com"
                required
                inputType="email"
                handleChange={handleChange}
                value={loginDetails.email}
              />
              <InputField
                label="Password"
                name="password"
                placeholder="********"
                required
                inputType={passwordType}
                handleChange={handleChange}
                value={loginDetails.password}
                isPassword
              />
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <input type="checkbox" name="" id="" />
                  <p className="md:text-sm text-[#C5165D]">Remember me</p>
                </div>
                <div>
                  <p className="md:text-sm text-[#C5165D] underline">
                    Forgot your password?{' '}
                  </p>
                </div>
              </div>
              <Button variant="pink" className="w-full mt-5">
                {submitting ? 'Logging in' : 'Login'}
              </Button>
            </form>
            <p className="font-medium text-md text-[#321463] text-center mt-2">
              Or sign in using
            </p>
            <div className="flex flex-col md:flex-row items-center md:items-end gap-5 mt-2 space-y-2">
              <a
                href={`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/sessions/login/google`}
                style={{ width: '100%' }}
              >
                <Button
                  variant="redoutline"
                  type="submit"
                  name="submit"
                  id="submit"
                  className=" flex items-center justify-center gap-2 text-lg md:text-base w-full"
                >
                  <FaGoogle className="text-xl" />
                  Login via Google+
                </Button>
              </a>
              <a
                href={`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/sessions/login/github`}
                style={{ width: '100%' }}
              >
                <Button
                  variant="blueoutline"
                  type="submit"
                  name="submit"
                  id="submit"
                  className=" flex items-center justify-center gap-2 text-lg md:text-base w-full"
                >
                  <BsGithub className="text-xl" />
                  Login via Github
                </Button>
              </a>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  )
}

export default LoginPage
