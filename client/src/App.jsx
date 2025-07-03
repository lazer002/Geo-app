import React, { useState, useEffect } from 'react';

function App() {
  const [locations, setLocations] = useState([]);
  const [fetching, setFetching] = useState(false);

  const fetchLocations = async () => {
    setFetching(true);
    try {
      const res = await fetch('/api/all-locations');
      const data = await res.json();
      setLocations(data);
    } catch (err) {
      setLocations([]);
    }
    setFetching(false);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 20, border: '1px solid #ddd', borderRadius: 8, background: '#fafafa' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <h2>All Users & Device Details</h2>
        <button onClick={fetchLocations} disabled={fetching} style={{ padding: '4px 12px', background: '#43a047', color: '#fff', border: 'none', borderRadius: 4 }}>
          {fetching ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
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
