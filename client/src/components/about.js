import React from "react"

const about = () =>{
    return (
        <section id="about">
        <div>
            {/* About Start */}
  <div className="container-xxl py-6" id="elem1">
    <div className="container">
      <div className="row g-5 align-items-center">
        <div className="col-lg-6 wow zoomIn" data-wow-delay="0.1s">
          <img className="img-fluid" src="img/about.png" />
        </div>
        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
          <div className="d-inline-block border rounded-pill text-primary px-4 mb-3">About Us</div>
          <h2 className="mb-4">Helping you grow your business or find the perfect job</h2>
          <p className="mb-4"></p>
          <div className="row g-3 mb-4">
            <div className="col-12 d-flex">
              <div className="flex-shrink-0 btn-lg-square rounded-circle bg-primary">
                <i className="fa fa-user-tie text-white" />
              </div>
              <div className="ms-4">
                <h6>Find a job</h6>
                <span>Tempor erat elitr rebum at clita. Diam dolor ipsum amet eos erat ipsum lorem et sit sed stet lorem sit clita duo</span>
              </div>
            </div>
            <div className="col-12 d-flex">
              <div className="flex-shrink-0 btn-lg-square rounded-circle bg-primary">
                <i className="fa fa-chart-line text-white" />
              </div>
              <div className="ms-4">
                <h6>Grow your business and find the best employees</h6>
                <span>Tempor erat elitr rebum at clita. Diam dolor ipsum amet eos erat ipsum lorem et sit sed stet lorem sit clita duo</span>
              </div>
            </div>
          </div>
          <a className="btn btn-primary rounded-pill py-3 px-5 mt-2" href>Check services</a>
        </div>
      </div>
    </div>
  </div>
  {/* About End */}
        </div>
        </section>
    )
}
export default about