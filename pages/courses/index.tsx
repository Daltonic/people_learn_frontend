import PageHeader from '@/components/reusableComponents/PageHeader'
import Filterlayer from '@/components/courses/Filterlayer'
import Layout from '@/components/layout/Layout'
import { GetServerSidePropsContext, NextPage } from 'next'
import { FetchProductsParams, ICourses } from '@/utils/type.dt'
import Pagination from '@/components/reusableComponents/Pagination'
import { fetchCourses } from '@/services/backend.services'
import Head from 'next/head'
import ProductCardLandscape from '@/components/courses/ProductCardLandscape'

const sortOptions = [
  { name: 'Newest', value: 'newest' },
  { name: 'Oldest', value: 'oldest' },
]

const filterOptions = [
  { name: 'All', value: 'All' },
  { name: 'Beginner', value: 'Beginner' },
  { name: 'Intermediate', value: 'Intermediate' },
  { name: 'Advanced', value: 'Advanced' },
]

const Page: NextPage<{ coursesObj: ICourses }> = ({ coursesObj }) => {
  return (
    <>
      <Head>
        <title>Courses | PeopleLearn</title>
        <meta
          name="description"
          content="Explore our trending courses in Blockchain and Web3 Development. Join the community and learn from the best."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://peoplelearn.io/courses" />
        <meta property="og:title" content="Courses | PeopleLearn" />
        <meta
          property="og:description"
          content="Explore our trending courses in Blockchain and Web3 Development. Join the community and learn from the best."
        />
        <meta
          property="og:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709450883536__fcix.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@peoplelearn" />
        <meta name="twitter:title" content="Courses | PeopleLearn" />
        <meta
          name="twitter:description"
          content="Explore our trending courses in Blockchain and Web3 Development. Join the community and learn from the best."
        />
        <meta
          name="twitter:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709450883536__fcix.png"
        />
      </Head>

      <Layout>
        <div className="flex justify-center mx-auto w-11/12 sm:w-3/4 ">
          <div className="flex flex-col mt-5 md:mt-10">
            <div>
              <PageHeader> Trending courses</PageHeader>
              <p className="text-slate-600 capitalize mt-1">
                Explore our trending courses in Blockchain and We3 Development.
              </p>
            </div>
            <Filterlayer
              searchPlaceholder="Search Courses Here..."
              route="/courses"
              filterLabel="Difficulty"
              filterOptions={filterOptions}
              sortLabel="Order By"
              sortOptions={sortOptions}
            />
            <div className="mt-5 flex flex-col sm:flex-row sm:flex-wrap sm:justify-between md:justify-start md:flex-nowrap md:flex-col">
              {coursesObj.courses.map((course) => (
                <ProductCardLandscape
                  key={course._id}
                  data={course}
                  type="Course"
                />
              ))}
            </div>

            {coursesObj.numOfPages > 1 && (
              <Pagination totalPages={coursesObj.numOfPages} />
            )}
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Page

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const searchQuery = context.query.q || ''
  const page = context.query.page
  const filter = context.query.filter || 'newest'
  const difficulty = context.query.difficulty

  try {
    const courses = await fetchCourses({
      searchQuery: searchQuery as string,
      page: Number(page),
      filter: filter as FetchProductsParams['filter'],
      difficulty:
        difficulty === 'All'
          ? null
          : (difficulty as FetchProductsParams['difficulty']),
      type: 'Course',
    })

    return {
      props: {
        coursesObj: JSON.parse(JSON.stringify(courses)) as ICourses,
      },
    }
  } catch (e: any) {
    console.log(e.message)
    return {
      props: {
        coursesObj: {} as ICourses,
      },
    }
  }
}
