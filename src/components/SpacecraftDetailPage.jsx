import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from './Loading';

/**
 
 * Shows information for a selected spacecraft
 * Fetches spacecraft data from the SWAPI API using the ID from the URL endpoint
 * Displays all relevant spacecraft details
 * "Back to spacecraft list" and "Back to Dashboard" buttons for navigation
 * Uses a background image from sciencealert.com
 */

const backgroundStyle = {
  minHeight: '100vh',
  backgroundImage: 'url(https://www.sciencealert.com/images/2019-02/processed/GettyImages-861460116_1_1024.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  paddingTop: '32px'
};

const SpacecraftDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [spacecraft, setSpacecraft] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://swapi.info/api/starships/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then((data) => {
                setSpacecraft(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <Loading />;
    if (error) return <div>Error loading spacecraft: {error}</div>;

    return (
        <div className="spacecraft-detail" style={backgroundStyle}>
            <button className="back-btn" onClick={() => navigate('/spacecrafts')}>
                ← Back to spacecraft list
            </button>
            <button
                className="back-btn"
                style={{ marginLeft: 12 }}
                onClick={() => navigate('/')}
            >
                ← Back to Dashboard
            </button>
            <h1>{spacecraft.name}</h1>
            <p><strong>Model:</strong> {spacecraft.model}</p>
            <p><strong>Manufacturer:</strong> {spacecraft.manufacturer}</p>
            <p><strong>Passengers:</strong> {spacecraft.passengers}</p>
            <p><strong>Crew:</strong> {spacecraft.crew}</p>
            <p><strong>Starship Class:</strong> {spacecraft.starship_class}</p>
            <p><strong>Length:</strong> {spacecraft.length}</p>
            <p><strong>Max Atmosphering Speed:</strong> {spacecraft.max_atmosphering_speed}</p>
            <p><strong>Cargo Capacity:</strong> {spacecraft.cargo_capacity}</p>
            <p><strong>Hyperdrive Rating:</strong> {spacecraft.hyperdrive_rating}</p>
        </div>
    );
};

export default SpacecraftDetailPage;