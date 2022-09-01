import React from "react";
import Navbar from '../components/navbar';
import Header from '../components/header';
import Footer from '../components/footer'
import About from '../components/about'
import Home from '../pages/Home';
import Services from '../components/services';
function Index() {
    return (
        
      <div className="App">
        <Navbar />
        <Header />
        <About />
        
        <Services />
        <Home />
        <Footer />
      </div>
      
    );
  }
  
  export default Index;