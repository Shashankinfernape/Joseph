import React from 'react';
import './SchoolBrand.css';

export default function SchoolBrand() {
  return (
    <div className="school-brand">
      <div className="school-logo">
        <img
          src="/images/school-crest-transparent.png"
          alt="St. Joseph English High School"
        />
      </div>

      <div className="school-info">
        <h1>
          <span className="title-primary">ST. JOSEPH</span>
          <span className="title-secondary">ENGLISH HIGH SCHOOL</span>
        </h1>

        <div className="gold-rule"></div>

        <p className="affiliation">
          Affiliated to CBSE Board <span>·</span> No. 831249
        </p>

        <p className="location">
          Kothanur, Bengaluru <span>·</span> 560 077, Karnataka, India
        </p>
      </div>
    </div>
  );
}
