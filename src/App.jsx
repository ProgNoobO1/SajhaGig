import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import SignupForm from "./pages/SignupForm.jsx";
import BrowseGigs from "./pages/BrowseGigs.jsx";
import FindWork from "./pages/FindWork.jsx";
import ClientDashboard from "./pages/ClientDashboard.jsx";
import FreelancerDashboard from "./pages/FreelancerDashboard.jsx";
import ClientProjects from "./pages/ClientProjects.jsx";
import FreelancerProjects from "./pages/FreelancerProjects.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import ReviewClient from "./pages/ReviewClient.jsx";
import ReviewFreelancer from "./pages/ReviewFreelancer.jsx";
import GigDetail from "./pages/GigDetail.jsx";
import CreateGig from "./pages/CreateGig.jsx";
import Chat from "./pages/Chat.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/client" element={<SignupForm role="client" />} />
        <Route path="/signup/freelancer" element={<SignupForm role="freelancer" />} />
        <Route path="/browse-gigs" element={<BrowseGigs />} />
        <Route path="/find-work" element={<FindWork />} />
        <Route path="/client/dashboard" element={<ClientDashboard />} />
        <Route path="/client/projects" element={<ClientProjects />} />
        <Route path="/client/reviews" element={<ReviewClient />} />
        <Route path="/freelancer/dashboard" element={<FreelancerDashboard />} />
        <Route path="/freelancer/projects" element={<FreelancerProjects />} />
        <Route path="/freelancer/reviews" element={<ReviewFreelancer />} />
        <Route path="/freelancer/portfolio" element={<Portfolio />} />
        <Route path="/freelancer/create-gig" element={<CreateGig />} />
        <Route path="/gig/:id" element={<GigDetail />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
