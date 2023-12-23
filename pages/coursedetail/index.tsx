import CourseHead from '@/components/coursedetail/CourseHead'
import Overview from '@/components/coursedetail/Overview'
import Layout from '@/components/layout/Layout'
import { NextPage } from 'next'

const Page: NextPage = () => {
  return (
    <Layout>
      <div className="md:px-16 md:py-24 px-5 py-10">
        {/* <CourseHead/> */}
        <Overview />
      </div>
    </Layout>
  )
}

export default Page