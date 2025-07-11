import CustomLoader from 'components/CustomLoader';
import React, { useEffect, useState } from 'react';
import AnnouncementSlider from '../components/AnnouncementSlider';
import EventCard from '../components/EventCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import StaffAchievementCard from '../components/StaffAchievementCard';
import StudentAchievementCard from '../components/StudentAchievementCard';
import { useTheme } from '../context/ThemeContext';
import { departmentService } from '../services/department/department_service';
import { eventService } from '../services/event/event_service';
import { staffAchievementService } from '../services/staff-achievement/staffAchievement_service';
import { studentAchievementService } from '../services/student-achievement/studentAchievement_service';
import { CollegeData, DepartmentData, EventData, StaffAchievement, StudentAchievement } from '../types';

const Home: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [data, setData] = useState<CollegeData | null>(null);
  const [events, setEvents] = useState<EventData[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState<string | null>(null);
  const [staffAchievements, setStaffAchievements] = useState<StaffAchievement[]>([]);
  const [studentAchievements, setStudentAchievements] = useState<StudentAchievement[]>([]);
  const [departments, setDepartments] = useState<DepartmentData[]>([]);
  const [staffLoading, setStaffLoading] = useState(true);
  const [studentLoading, setStudentLoading] = useState(true);
  const [departmentsLoading, setDepartmentsLoading] = useState(true);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  useEffect(() => {
    eventService.getEvents({ limit: 6 })
      .then(data => setEvents(data.items))
      .catch(() => setEventsError('Failed to load events.'))
      .finally(() => setEventsLoading(false));
  }, []);

  useEffect(() => {
    staffAchievementService.getStaffAchievements({ limit: 4 })
      .then(data => setStaffAchievements(data.items))
      .finally(() => setStaffLoading(false));
    studentAchievementService.getStudentAchievements({ limit: 4 })
      .then(data => setStudentAchievements(data.items))
      .finally(() => setStudentLoading(false));
  }, []);

  useEffect(() => {
    departmentService.getDepartments({ limit: 10 })
      .then(data => setDepartments(data.items))
      .finally(() => setDepartmentsLoading(false));
  }, []);

  if (!data) return <CustomLoader />;

  return (
    <>
      <div className={`${theme.background} min-h-screen`}>
        <Header theme={theme} toggleTheme={toggleTheme} collegeName={data.collegeName} logo={data.footer.logo} />

        {/* Hero Section */}
        <section
          className="relative h-[60vh] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${data.backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent"></div>
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg tracking-tight">{data.collegeName}</h1>
            <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-8 font-light">{data.description}</p>
            <a
              href="#about"
              className="inline-block px-8 py-3 bg-green-600 hover:bg-green-700 rounded-full text-lg font-semibold shadow-lg transition"
            >
              Discover More
            </a>
          </div>
        </section>

        {/* Announcements */}
        <div className="shadow-md">
          <AnnouncementSlider theme={theme} announcements={data.announcements} />
        </div>

        {/* Welcome Section */}
        <section id="about" className="py-20 px-2 sm:px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            {/* Responsive layout */}
            <div className="flex flex-col md:flex-row items-center md:items-stretch gap-8">
              {/* Manager & Chairman (left, desktop) */}
              <div className="hidden md:flex flex-col justify-center items-center w-1/4 gap-8">
                {/* Manager */}
                {data.profiles[1] && (
                  <div className="flex flex-col items-center">
                    <img
                      src={data.profiles[1].image}
                      alt={data.profiles[1].name}
                      className="w-24 h-24 rounded-full object-cover shadow border-2 border-gray-200 mb-2"
                    />
                    <div className="font-semibold text-gray-800">{data.profiles[1].name}</div>
                    <div className="text-gray-600 text-sm">{data.profiles[1].designation}</div>
                  </div>
                )}
                {/* Chairman */}
                {data.profiles[2] && (
                  <div className="flex flex-col items-center mt-8">
                    <img
                      src={data.profiles[2].image}
                      alt={data.profiles[2].name}
                      className="w-24 h-24 rounded-full object-cover shadow border-2 border-gray-200 mb-2"
                    />
                    <div className="font-semibold text-gray-800">{data.profiles[2].name}</div>
                    <div className="text-gray-600 text-sm">{data.profiles[2].designation}</div>
                  </div>
                )}
              </div>
              {/* Center Welcome Text */}
              <div className="flex-1 flex flex-col items-center md:justify-center">
                {/* Principal (mobile only) */}
                <div className="flex flex-col items-center md:hidden mb-6">
                  <img
                    src={data.profiles[0]?.image}
                    alt={data.profiles[0]?.name}
                    className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-green-200 mb-2"
                    style={{ objectPosition: "center top" }}
                  />
                  <div className="font-semibold text-gray-800">{data.profiles[0]?.name}</div>
                  <div className="text-gray-600 text-sm">{data.profiles[0]?.designation}</div>
                </div>
                {/* Welcome Text */}
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 text-center">Welcome to {data.collegeName}</h2>
                <p className="text-base sm:text-lg text-gray-700 mb-4 leading-relaxed text-center max-w-2xl mx-auto">
                  An institution founded on the vision of educational equity, empowerment, and excellence.
                  Since its establishment in 2005 by the Nilambur Muslim Orphanage Committee under the visionary leadership of Sri PV Abdul Wahab, Amal College has stood as a beacon of hope for underserved and marginalized communities. As a recognized Minority Educational Institution, we take immense pride in our commitment to inclusive education, with 20% of our seats specially reserved for orphans—a testament to our enduring mission to uplift the lives of those who need it the most.
                </p>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-center max-w-2xl mx-auto">
                  We believe that higher education is not just about acquiring knowledge, but about shaping character, nurturing potential, and transforming lives. At Amal College, we are dedicated to fostering a learning community that excels in intellectual, moral, and social dimensions. With a vibrant academic environment, state-of-the-art facilities, and a passionate team of educators, we aim to empower every student—especially those from disadvantaged backgrounds—to dream beyond limitations and rise above socio-economic barriers.
                </p>
              </div>
              {/* Principal (desktop only, right) */}
              <div className="hidden md:flex flex-col items-center w-1/4 justify-center">
                <img
                  src={data.profiles[0]?.image}
                  alt={data.profiles[0]?.name}
                  className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-green-200 mb-2"
                  style={{ objectPosition: "center top" }}
                />
                <div className="font-semibold text-gray-800">{data.profiles[0]?.name}</div>
                <div className="text-gray-600 text-sm">{data.profiles[0]?.designation}</div>
              </div>
            </div>
            {/* Manager & Chairman (mobile only, row) */}
            <div className="flex md:hidden flex-row gap-8 mt-8 justify-center items-center">
              {data.profiles.slice(1, 3).map((profile, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="w-20 h-20 rounded-full object-cover shadow border-2 border-gray-200 mb-2"
                  />
                  <div className="font-semibold text-gray-800">{profile.name}</div>
                  <div className="text-gray-600 text-sm">{profile.designation}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">Upcoming Events</h2>
            {eventsLoading ? (
              <div className="text-center text-lg text-blue-700">Loading events...</div>
            ) : eventsError ? (
              <div className="text-center text-red-600">{eventsError}</div>
            ) : events.length === 0 ? (
              <div className="text-center text-gray-500">No events found.</div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                  {events.slice(0, 3).map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
                <div className="text-center mt-8">
                  <a href="/events" className="inline-block px-8 py-3 bg-blue-700 hover:bg-blue-800 rounded-full text-white font-semibold shadow-lg transition">Show All Events</a>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Staff Achievements Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-green-800 mb-12">Staff Achievements</h2>
            {staffLoading ? (
              <div className="text-center text-lg text-green-700">Loading...</div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                  {staffAchievements.slice(0, 4).map((item, idx) => (
                    <StaffAchievementCard key={item.id} achievement={item} />
                  ))}
                </div>
                <div className="text-center mt-8">
                  <a href="/staff-achievements" className="inline-block px-8 py-3 bg-green-700 hover:bg-green-800 rounded-full text-white font-semibold shadow-lg transition">Show All Staff Achievements</a>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Student Achievements Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-yellow-50 to-pink-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-yellow-700 mb-12">Student Achievements</h2>
            {studentLoading ? (
              <div className="text-center text-lg text-yellow-600">Loading...</div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                  {studentAchievements.slice(0, 4).map((item, idx) => (
                    <StudentAchievementCard key={item.id} achievement={item} />
                  ))}
                </div>
                <div className="text-center mt-8">
                  <a href="/student-achievements" className="inline-block px-8 py-3 bg-yellow-500 hover:bg-yellow-600 rounded-full text-white font-semibold shadow-lg transition">Show All Student Achievements</a>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Departments Section */}
        <section className={`${theme.background} py-20 px-4`}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Departments</h2>
            {departmentsLoading ? (
              <div className="text-center text-lg text-green-700">Loading departments...</div>
            ) : (
              <div className="flex overflow-x-auto space-x-6 pb-4">
                {departments.map((department) => (
                  <a key={department.id} href={`/departments?id=${department.id}`}>
                    <div className={`${theme.card} border border-gray-200 p-4 rounded-lg shadow-md text-center min-w-[200px] hover:scale-105 transition`}>
                      <img
                        src={department.imageUrl}
                        alt={department.depName}
                        className="w-full h-32 object-cover rounded-md mb-2 border border-gray-200"
                      />
                      <h3 className={`font-semibold ${theme.text}`}>{department.depName}</h3>
                    </div>
                  </a>
                ))}
              </div>
            )}
            <div className="text-center mt-8">
              <a
                href="/departments"
                className="inline-block px-8 py-3 bg-green-600 hover:bg-green-700 rounded-full text-white font-semibold shadow-lg transition"
              >
                Show All Departments
              </a>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        {/* <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-200">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Official Partners</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center">
              {data.partners.map((partner, index) => (
                <img key={index} src={partner} alt={`Partner ${index + 1}`} className="h-16 md:h-20 object-contain mx-auto grayscale hover:grayscale-0 transition" />
              ))}
            </div>
          </div>
        </section> */}

        <Footer theme={theme} footerData={data.footer} />
      </div>
    </>
  );
};

export default Home;