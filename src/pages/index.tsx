import CustomLoader from 'components/CustomLoader';
import React, { useEffect, useState } from 'react';
import AnnouncementSlider from '../components/AnnouncementSlider';
import DepartmentCard from '../components/DepartmentCard';
import EventCard from '../components/EventCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProfileCard from '../components/ProfileCard';
import StaffAchievementCard from '../components/StaffAchievementCard';
import StudentAchievementCard from '../components/StudentAchievementCard';
import { useTheme } from '../context/ThemeContext';
import { eventService } from '../services/event/event_service';
import { staffAchievementService } from '../services/staff-achievement/staffAchievement_service';
import { studentAchievementService } from '../services/student-achievement/studentAchievement_service';
import { CollegeData, EventData, StaffAchievement, StudentAchievement } from '../types';


const Home: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [data, setData] = useState<CollegeData | null>(null);
  const [events, setEvents] = useState<EventData[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState<string | null>(null);
  const [staffAchievements, setStaffAchievements] = useState<StaffAchievement[]>([]);
  const [studentAchievements, setStudentAchievements] = useState<StudentAchievement[]>([]);
  const [staffLoading, setStaffLoading] = useState(true);
  const [studentLoading, setStudentLoading] = useState(true);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  useEffect(() => {
    eventService.getEvents({ limit: 6 })
      .then(setEvents)
      .catch(() => setEventsError('Failed to load events.'))
      .finally(() => setEventsLoading(false));
  }, []);

  useEffect(() => {
    staffAchievementService.getStaffAchievements({ limit: 4 })
      .then(setStaffAchievements)
      .finally(() => setStaffLoading(false));
    studentAchievementService.getStudentAchievements({ limit: 4 })
      .then(setStudentAchievements)
      .finally(() => setStudentLoading(false));
  }, []);

  if (!data) return <CustomLoader />;

  return (
    <>

      <div className={`${theme.background} min-h-screen`}>
        <Header theme={theme} toggleTheme={toggleTheme} collegeName={data.collegeName} logo={data.footer.logo} />

        {/* Hero Section */}
        <section
          className="relative h-96 flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${data.backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{data.collegeName}</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">{data.description}</p>
          </div>
        </section>

        <AnnouncementSlider theme={theme} announcements={data.announcements} />

        {/* Welcome Section */}
        <section className="py-12 px-6">
          <h2 className={`text-3xl font-bold text-center ${theme.text} mb-8`}>Welcome to {data.collegeName}</h2>
          <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
            <div className="md:w-1/2">
              <p className={`${theme.text} mb-4`}>
                An institution founded on the vision of educational equity, empowerment, and excellence.
                Since its establishment in 2005 by the Nilambur Muslim Orphanage Committee under the visionary leadership of Sri PV Abdul Wahab, Amal College has stood as a beacon of hope for underserved and marginalized communities. As a recognized Minority Educational Institution, we take immense pride in our commitment to inclusive education, with 20% of our seats specially reserved for orphans  a testament to our enduring mission to uplift the lives of those who need it the most.
                We believe that higher education is not just about acquiring knowledge, but about shaping character, nurturing potential, and transforming lives. At Amal College, we are dedicated to fostering a learning community that excels in intellectual, moral, and social dimensions. With a vibrant academic environment, state-of-the-art facilities, and a passionate team of educators, we aim to empower every student  especially those from disadvantaged backgrounds  to dream beyond limitations and rise above socio-economic barriers.
                In a region where access to quality higher education remains a challenge for many, we are committed to reversing this trend by providing meaningful opportunities for growth, innovation, and self-realization. Our campus is more than a space for academic pursuit  it is a place where learning transcends classrooms and education becomes a tool for social change.
                Let us join hands in building a future where no dream is too distant, and no student is left behind. Welcome to Amal College  where education is driven by compassion, guided by values, and inspired by the hope of a better tomorrow.              </p>

            </div>
            <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {data.profiles.map((profile, index) => (
                <ProfileCard key={index} profile={profile} theme={theme} />
              ))}
            </div>
          </div>
        </section>

        {/* Highlights Section
        <section className={`${theme.gradient} py-12 px-6`}>
          <h2 className={`text-3xl font-bold text-center ${theme.text} mb-8`}>Highlights of {data.collegeName}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {data.highlights.slice(0, 3).map((highlight, index) => (
              <HighlightCard key={index} highlight={highlight} theme={theme} />
            ))}
          </div>
          {data.highlights.length > 3 && (
            <div className="text-center mt-6">
              <button className={`${theme.button} px-6 py-2 rounded-md text-white`}>View All</button>
            </div>
          )}
        </section> */}

        {/* Events Section */}
        <section className="relative py-16 px-6 bg-gradient-to-br from-blue-50 to-blue-200">
          <div className="absolute inset-0 pointer-events-none bg-[url('/images/campus-bg.jpg')] opacity-10 bg-cover bg-center" />
          <div className="relative max-w-6xl mx-auto">
            <h2 className="text-4xl font-extrabold text-center text-blue-900 mb-10 drop-shadow-lg">Upcoming Events</h2>
            {eventsLoading ? (
              <div className="text-center text-lg text-blue-700">Loading events...</div>
            ) : eventsError ? (
              <div className="text-center text-red-600">{eventsError}</div>
            ) : events.length === 0 ? (
              <div className="text-center text-gray-500">No events found.</div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {events.slice(0, 3).map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
                <div className="text-center mt-6">
                  <a href="/events" className={`${theme.button} px-6 py-2 rounded-md text-white inline-block`}>Show All</a>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Staff Achievements Section */}
        <section className="py-12 px-6">
          <h2 className={`text-3xl font-bold text-center ${theme.text} mb-8`}>Staff Achievements</h2>
          {staffLoading ? (
            <div className="text-center text-lg text-blue-700">Loading...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {staffAchievements.slice(0, 4).map((item, idx) => (
                  <StaffAchievementCard key={item.id} achievement={item} />
                ))}
              </div>
              <div className="text-center mt-6">
                <a href="/staff-achievements" className={`${theme.button} px-6 py-2 rounded-md text-white inline-block`}>Show All</a>
              </div>
            </>
          )}
        </section>

        {/* Student Achievements Section */}
        <section className="py-12 px-6">
          <h2 className={`text-3xl font-bold text-center ${theme.text} mb-8`}>Student Achievements</h2>
          {studentLoading ? (
            <div className="text-center text-lg text-blue-700">Loading...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {studentAchievements.slice(0, 4).map((item, idx) => (
                  <StudentAchievementCard key={item.id} achievement={item} />
                ))}
              </div>
              <div className="text-center mt-6">
                <a href="/student-achievements" className={`${theme.button} px-6 py-2 rounded-md text-white inline-block`}>Show All</a>
              </div>
            </>
          )}
        </section>

        {/* Departments Section */}
        <section className="py-12 px-6">
          <h2 className={`text-3xl font-bold text-center ${theme.text} mb-8`}>Our Departments</h2>
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {data.departments.map((department, index) => (
              <DepartmentCard key={index} department={department} />
            ))}
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-12 px-6">
          <h2 className={`text-3xl font-bold text-center ${theme.text} mb-8`}>Official Partners</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {data.partners.map((partner, index) => (
              <img key={index} src={partner} alt={`Partner ${index + 1}`} className="h-16 md:h-20 object-contain" />
            ))}
          </div>
        </section>

        <Footer theme={theme} footerData={data.footer} />
      </div>
    </>
  );
};

export default Home;