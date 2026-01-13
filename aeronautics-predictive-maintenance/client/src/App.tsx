import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import LearningEnhanced from "./pages/LearningEnhanced";
import NewsEnhanced from "./pages/NewsEnhanced";
import BlogsEnhanced from "./pages/BlogsEnhanced";
import Community from "./pages/Community";
import Resources from "./pages/Resources";
import About from "./pages/About";
import InspiringProfessionals from "./pages/InspiringProfessionals";
import BachelorOrientation from "./pages/BachelorOrientation";
import Conferences from "./pages/Conferences";
import UserProfile from "./pages/UserProfile";
import Forum from "./pages/Forum";
import Certifications from "./pages/Certifications";


function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/learning" component={LearningEnhanced} />
      <Route path="/news" component={NewsEnhanced} />
      <Route path="/blogs" component={BlogsEnhanced} />
      <Route path="/community" component={Community} />
      <Route path="/resources" component={Resources} />
      <Route path="/about" component={About} />
      <Route path="/inspiring-professionals" component={InspiringProfessionals} />
      <Route path="/bachelor-orientation" component={BachelorOrientation} />
      <Route path="/conferences" component={Conferences} />
      <Route path="/profile" component={UserProfile} />
      <Route path="/forum" component={Forum} />
      <Route path="/certifications" component={Certifications} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider
          defaultTheme="light"
          // switchable
        >
          <TooltipProvider>
            <Toaster />
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">
                <Router />
              </main>
              <Footer />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
