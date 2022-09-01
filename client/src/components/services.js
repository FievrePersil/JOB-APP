import React from "react"

const services = () =>{
    return (
        <section id="services">
        {/* Service Start */}
  <div className="container-xxl py-6">
  <div className="container">
    <div className="mx-auto text-center wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: 600}}>
      <div className="d-inline-block border rounded-pill text-primary px-4 mb-3">Our Services</div>
      <h2 className="mb-5">We Provide Solutions On Your Business</h2>
    </div>
    <div className="row g-4">
      <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
        <div className="service-item rounded h-100">
          <div className="d-flex justify-content-between">
            <div className="service-icon">
              <i className="fa fa-user-tie fa-2x" />
            </div>
            <a className="service-btn" href>
              <i className="fa fa-link fa-2x" />
            </a>
          </div>
          <div className="p-5">
            <h5 className="mb-3">Business Research</h5>
            <span>Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem.</span>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
        <div className="service-item rounded h-100">
          <div className="d-flex justify-content-between">
            <div className="service-icon">
              <i className="fa fa-chart-pie fa-2x" />
            </div>
            <a className="service-btn" href>
              <i className="fa fa-link fa-2x" />
            </a>
          </div>
          <div className="p-5">
            <h5 className="mb-3">Stretagic Planning</h5>
            <span>Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem.</span>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.6s">
        <div className="service-item rounded h-100">
          <div className="d-flex justify-content-between">
            <div className="service-icon">
              <i className="fa fa-chart-line fa-2x" />
            </div>
            <a className="service-btn" href>
              <i className="fa fa-link fa-2x" />
            </a>
          </div>
          <div className="p-5">
            <h5 className="mb-3">Market Analysis</h5>
            <span>Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem.</span>
          </div>
        </div>
      </div>



    </div>
  </div>
</div>
{/* Service End */}
</section>
    )
}

export default services