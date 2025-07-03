import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const url = `https://location-em2y.onrender.com`;
  const [locations, setLocations] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');

  // Helper functions for device info
  function getDeviceId() {
    let id = localStorage.getItem('deviceId');
    if (!id) {
      id = 'dev-' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('deviceId', id);
    }
    return id;
  }

  function getDeviceType() {
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) return 'Android';
    if (/iPad|iPhone|iPod/.test(ua)) return 'iOS';
    if (/Win/.test(ua)) return 'Windows';
    if (/Mac/.test(ua)) return 'Mac';
    return 'Other';
  }

  function getOSVersion() {
    const ua = navigator.userAgent;
    const match = ua.match(/(Android|iPhone OS|Windows NT|Mac OS X) ([\d_\.]+)/);
    return match ? match[0] : 'Unknown';
  }

  function getAppVersion() {
    // If you have a web app version, set it here
    return '1.0.0';
  }

  // Send location to backend
  const sendLocation = (latitude, longitude) => {
    axios.post(`${url}/api/location`, {
      latitude,
      longitude,
      deviceId: getDeviceId(),
      deviceType: getDeviceType(),
      osVersion: getOSVersion(),
      appVersion: getAppVersion()
    })
      .then(() => {
        setLocationStatus('Location sent! Thank you.');
        fetchLocations(); // Optionally refresh the table
      })
      .catch(err => {
        setLocationStatus('Failed to send location: ' + (err.response?.data?.message || err.message));
      });
  };

  // Collect location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      setLocationStatus('Getting your location...');
      navigator.geolocation.getCurrentPosition(
        pos => {
          sendLocation(pos.coords.latitude, pos.coords.longitude);
        },
        err => {
          setLocationStatus('Could not get location: ' + err.message);
        }
      );
    } else {
      setLocationStatus('Geolocation not supported.');
    }
    // eslint-disable-next-line
  }, []);

  const fetchLocations = async () => {
    setFetching(true);
    try {
      const res = await fetch(`${url}/api/all-locations`);
      const data = await res.json();
      setLocations(data);
    } catch (err) {
      setLocations([]);
    }
    setFetching(false);
  };

  useEffect(() => {
    fetchLocations();
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 20, border: '1px solid #ddd', borderRadius: 8, background: '#fafafa' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <h2>All Users & Device Details</h2>
        <button onClick={fetchLocations} disabled={fetching} style={{ padding: '4px 12px', background: '#43a047', color: '#fff', border: 'none', borderRadius: 4 }}>
          {fetching ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      <div style={{ marginBottom: 16, color: '#1976d2', fontWeight: 500 }}>{locationStatus}</div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
          <thead>
            <tr style={{ background: '#e3e3e3' }}>
              <th style={{ padding: 8, border: '1px solid #ccc' }}>Device ID</th>
              <th style={{ padding: 8, border: '1px solid #ccc' }}>Latitude</th>
              <th style={{ padding: 8, border: '1px solid #ccc' }}>Longitude</th>
              <th style={{ padding: 8, border: '1px solid #ccc' }}>Count</th>
              <th style={{ padding: 8, border: '1px solid #ccc' }}>Timestamp</th>
              <th style={{ padding: 8, border: '1px solid #ccc' }}>Device Type</th>
              <th style={{ padding: 8, border: '1px solid #ccc' }}>OS Version</th>
              <th style={{ padding: 8, border: '1px solid #ccc' }}>App Version</th>
            </tr>
          </thead>
          <tbody>
            {locations.length === 0 ? (
              <tr><td colSpan={8} style={{ textAlign: 'center', padding: 16 }}>No data found.</td></tr>
            ) : (
              locations.map((loc, idx) => (
                <tr key={loc._id || idx}>
                  <td style={{ padding: 8, border: '1px solid #ccc' }}>{loc.deviceId}</td>
                  <td style={{ padding: 8, border: '1px solid #ccc' }}>{loc.latitude}</td>
                  <td style={{ padding: 8, border: '1px solid #ccc' }}>{loc.longitude}</td>
                  <td style={{ padding: 8, border: '1px solid #ccc' }}>{loc.count || 1}</td>
                  <td style={{ padding: 8, border: '1px solid #ccc' }}>{loc.timestamp ? new Date(loc.timestamp).toLocaleString() : ''}</td>
                  <td style={{ padding: 8, border: '1px solid #ccc' }}>{loc.deviceType}</td>
                  <td style={{ padding: 8, border: '1px solid #ccc' }}>{loc.osVersion}</td>
                  <td style={{ padding: 8, border: '1px solid #ccc' }}>{loc.appVersion}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
