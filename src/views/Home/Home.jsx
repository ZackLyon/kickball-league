import React from 'react';
import './Home.css';

export default function Home() {
  return (
    <div style={{ backgroundImage: 'url(kickball.jpg)' }} className='home-page'>
      <div className='kickball-title'>PNW Kickball League</div>
      <div className='acknowledgement'>Photo by cottonbro from Pexels</div>
    </div>
  );
}
