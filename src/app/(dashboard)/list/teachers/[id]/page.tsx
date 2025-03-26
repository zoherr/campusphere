import Image from 'next/image';
import BigCalendar from '@/components/BigCalendar';
import Announcement from '@/components/Announcements';
import Link from 'next/link';
import Perfomance from '@/components/Perfomance';
import FormModal from '@/components/FormModal';
import { table } from 'console';

const SingleTeacherPage = () => {
  return (
    < div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">

          {/* USER INFO CARD  */}
          <div className="bg-bluelight1 py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200"
                className="w-36 h-36 rounded-full object-cover"
                width={144}
                height={144}
                alt="" />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
            <div className='flex items-center gap-4'>
              <h1 className='text-xl font-semibold'>Taha Munpuri</h1>
              <FormModal 
                table = "teacher"
                type="update"
                data={{
                  id: 1,
                  username: "deanguerrero",
                  email: "deanguerrero@gmail.com",
                  password: "password",
                  firstName: "Dean",
                  LastName: "Guerrero",
                  phone: "+1 234 567 89",
                  address: "1234 Main St, Anytown, USA",
                  bloodType: "A+",
                  dateOfBirth: "2000-01-01",
                  sex: "male",
                  img: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200",
                }}
               />
              </div>
              <p className='text-sm text-gray-500'>Lorem ipsum dolor sit.</p>
              <div className='flex items-center justify-center gap-2 flex-wrap text-xs font-medium'>
                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                  <Image src='/blood.png' alt='' width={14} height={14} />
                  <span>A+ve</span>
                </div>
                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                  <Image src='/Date.png' alt='' width={14} height={14} />
                  <span>2025</span>
                </div>
                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                  <Image src='/mail.png' alt='' width={14} height={14} />
                  <span>user@gmail.com</span>
                </div>
                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                  <Image src='/phone.png' alt='' width={14} height={14} />
                  <span>123456789</span>
                </div>
              </div>
            </div>
          </div> {/* END USER INFO CARD */}

          {/* SMALL CARDS */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/*card*/}
            <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
              <Image
                alt=''
                src='/singleAttendance.png'
                width={24}
                height={24}
                className='w-6 h-6'
              />
              <div className=''>
                <h1 className='text-xl font-semibold'>90%</h1>
                <span className='text-sm text-gray'>Attendance</span>
              </div>
            </div>
            {/*card*/}
            <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
              <Image
                alt=''
                src='/singleBranch.png'
                width={24}
                height={24}
                className='w-6 h-6'
              />
              <div className=''>
                <h1 className='text-xl font-semibold'>2</h1>
                <span className='text-sm text-gray'>Branches</span>
              </div>
            </div>
            {/*card*/}
            <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
              <Image
                alt=''
                src='/singleLesson.png'
                width={24}
                height={24}
                className='w-6 h-6'
              />
              <div className=''>
                <h1 className='text-xl font-semibold'>6</h1>
                <span className='text-sm text-gray'>Lesson</span>
              </div>
            </div>
            {/*card*/}
            <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
              <Image
                alt=''
                src='/singleClass.png'
                width={24}
                height={24}
                className='w-6 h-6'
              />
              <div className=''>
                <h1 className='text-xl font-semibold'>6</h1>
                <span className='text-sm text-gray'>Classes</span>
              </div>
            </div>
          </div> {/* END SMALL CARDS */}
        </div> {/* END TOP */}

        {/* BOTTOM */}
        <div className='mt-4 bg-white p-4 rounded-md h-[800px]'>
          <h1>Teacher's Schedule</h1>
          <BigCalendar />
        </div> {/* END BOTTOM */}

      </div> {/* END LEFT */}

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className='bg-white p-4 rounded-md'>
          <h1 className='text-xl font-semibold'>Shortcuts</h1>
          <div className='mt-4 flex gap-4 flex-wrap text-xs text-black font-medium'>
            <Link className="p-3 rounded-md bg-greenlight" href="/">Teacher's Classes</Link>
            <Link className="p-3 rounded-md bg-purple" href="/">Teacher's Students</Link>
            <Link className="p-3 rounded-md bg-yellow-200" href="/">Teacher's Lessons</Link>
            <Link className="p-3 rounded-md bg-redlight" href="/">Teacher's Exams</Link>
            <Link className="p-3 rounded-md bg-blue" href="/">Teacher's Assignments</Link>

          </div>
        </div>
        <Perfomance />
        <Announcement />
      </div>
    </div>
  )
}

export default SingleTeacherPage;


// src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200"