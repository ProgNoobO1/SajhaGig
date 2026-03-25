import{BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './pages/login.jsx';
import FreelancerSignup from './pages/FreelancerSignup.jsx';
import ClientSignup from './pages/ClientSignup.jsx';
import Home from './pages/Home.jsx';
import Signup from './pages/Signup.jsx';
import BrowseGigs from "./pages/BrowseGigs.jsx";
import FreelancerDashboard from "./pages/FreelancerDashboard.jsx";
import ClientDashboard from "./pages/ClientDashboard.jsx";
import ClientProjects from "./pages/ClientProjects.jsx";
import FreelancerProjects from "./pages/FreelancerProjects.jsx";
import FindWork from "./pages/FindWork";
import Protfolio from "./pages/Protfolio";
import ReviewClient from "./pages/ReviewClient";
import ReviewFreelancer from "./pages/ReviewFreelancer";

function App() {
  return (
    <BrowserRouter>
    <Routes>
       <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/freelancersignup" element={<FreelancerSignup />} />
        <Route path="/clientsignup" element={<ClientSignup />} />
         <Route path="/browsegigs" element={<BrowseGigs />} />
         <Route path="/freelancerdashboard" element={<FreelancerDashboard/>} />
          <Route path="/findwork" element={<FindWork/>} />
          <Route path="/browsegigs" element={<BrowseGigs/>} />
          <Route path="clientdashboard" element={<ClientDashboard/>} />
           <Route path="ClientProjects" element={<ClientProjects/>} />
           <Route path="FreelancerProjects" element={<FreelancerProjects/>} />
           <Route path="protfolio" element={<Protfolio/>} />
           <Route path="reviewclient" element={<ReviewClient/>} />
           <Route path="reviewfreelancer" element={<ReviewFreelancer/>} />
      <Route path="/" element={<Home />} />
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
